import {
  BATTLE_CARD_NFT_ADDRESS,
  GAMECONTRACT_ADDRESS,
  GENERAL_PAYMASTER_ADDRESS,
  RPC_URL,
} from "@/utils/constants";
import {GameInfo, TxData} from "@/utils/types";
import {Contract, ethers} from "ethers";
import {toast} from "react-toastify";
import {encodeFunctionData, parseAbi} from "viem";
import gameContractAbi from "./../utils/abi.json";
import nftContractAbi from "./../utils/nftAbi.json";
import {Provider, utils} from "zksync-ethers";

var contract: Contract;
var nftContract: Contract;

////////////////////////////////////////////////////////
// Game Contract
////////////////////////////////////////////////////////

/**
 * get provider
 */
const getProvider = () => {
  // create provider
  const provider = new Provider(RPC_URL);
  return provider;
};

/**
 * get balance of GeneralPaymaster
 */
const getBalanceOfPaymaster = async () => {
  const provider = getProvider();
  let paymasterBalance = await provider.getBalance(GENERAL_PAYMASTER_ADDRESS);
  console.log(`Paymaster ETH balance is ${paymasterBalance.toString()}`);
};

/**
 * 初期化メソッド
 */
export const createContract = () => {
  // create provider
  const provider = getProvider();
  // コントラクトのインスタンスを生成
  contract = new ethers.Contract(
    GAMECONTRACT_ADDRESS,
    gameContractAbi,
    provider
  );
};

/**
 * createPlayGameTxData method
 */
export const playGame = async (playerAddress: string, count: number) => {
  const provider = getProvider();
  const gasPrice: any = await provider.getGasPrice();

  // Encoding the "ApprovalBased" paymaster flow's input
  const paymasterParams = utils.getPaymasterParams(GENERAL_PAYMASTER_ADDRESS, {
    type: "General",
    innerInput: new Uint8Array(),
  });

  // Estimate gas fee for mint transaction
  const gasLimit: any = await contract.populateTransaction.playGame(
    playerAddress,
    count,
    {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paymasterParams,
      },
    }
  );

  const fee = gasPrice * gasLimit;
  console.log("Transaction fee estimation is :>> ", fee.toString());

  const tx = await contract.playGame(playerAddress, count, {
    maxPriorityFeePerGas: BigInt(0),
    maxFeePerGas: gasPrice,
    gasLimit: 6000000,
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      paymasterParams,
    },
  });

  await tx.wait();

  console.log("play game tx info:", {tx});

  await getBalanceOfPaymaster();
};

/**
 * getGameStatus method
 */
export const getGameStatus = async (gameId: number): Promise<boolean> => {
  // get gameStatus
  const result = await contract.getOpeningStatus(gameId);
  return result;
};

/**
 * getGameInfo method
 */
export const getGameInfo = async (): Promise<GameInfo> => {
  // get gameStatus
  const result: GameInfo = await contract.getActiveGameInfo();

  console.log("gameInfo:", result);

  return result;
};

/**
 * getActiveGameId
 */
export const getActiveGameId = async (): Promise<number> => {
  const result: number = await contract.getActiveGameId();
  return result;
};

/**
 * addAttackEventLister
 */
export const addAttackEventListner = () => {
  contract.on("Attack", (from, to, value, event) => {
    let attackEvent = {
      from: from,
      to: to,
      value: value,
      eventData: event,
    };
    console.log(JSON.stringify(attackEvent, null, 4));
    toast.info(`You ${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  });
};

////////////////////////////////////////////////////////
// NFT Contract
////////////////////////////////////////////////////////

/**
 * create NFT Contract
 */
export const createNftContract = () => {
  // create provider
  const provider = getProvider();
  // コントラクトのインスタンスを生成
  nftContract = new ethers.Contract(
    BATTLE_CARD_NFT_ADDRESS,
    nftContractAbi,
    provider
  );
};

/**
 * transferNft method
 */
export const transferNft = async (from: any, count: number, id: number) => {
  const provider = getProvider();
  const gasPrice: any = await provider.getGasPrice();

  // Encoding the "ApprovalBased" paymaster flow's input
  const paymasterParams = utils.getPaymasterParams(GENERAL_PAYMASTER_ADDRESS, {
    type: "General",
    innerInput: new Uint8Array(),
  });

  // Estimate gas fee for mint transaction
  const gasLimit: any = await nftContract.populateTransaction.safeTransferFrom(
    from,
    GAMECONTRACT_ADDRESS,
    BigInt(id),
    BigInt(count),
    "0x",
    {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paymasterParams,
      },
    }
  );

  const fee = gasPrice * gasLimit;
  console.log("Transaction fee estimation is :>> ", fee.toString());
  // trasnfer nft
  const tx = await nftContract.safeTransferFrom(
    from,
    GAMECONTRACT_ADDRESS,
    BigInt(id),
    BigInt(count),
    "0x",
    {
      maxPriorityFeePerGas: BigInt(0),
      maxFeePerGas: gasPrice,
      gasLimit: 6000000,
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams,
      },
    }
  );

  await tx.wait();

  console.log("transfer NFT tx info:", {tx});

  await getBalanceOfPaymaster();
};
