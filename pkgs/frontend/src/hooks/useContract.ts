import {
  BATTLE_CARD_NFT_ADDRESS,
  GAMECONTRACT_ADDRESS,
  RPC_URL,
} from "@/utils/constants";
import {GameInfo, TxData} from "@/utils/types";
import {Contract, ethers} from "ethers";
import {encodeFunctionData, parseAbi} from "viem";
import gameContractAbi from "./../utils/abi.json";

const contractAddress = GAMECONTRACT_ADDRESS;
var contract: Contract;

////////////////////////////////////////////////////////
// Game Contract
////////////////////////////////////////////////////////

/**
 * 初期化メソッド
 */
export const createContract = () => {
  // create provider
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  // コントラクトのインスタンスを生成
  contract = new ethers.Contract(contractAddress, gameContractAbi, provider);
};

/**
 * createPlayGameTxData method
 */
export const createPlayGameTxData = async (
  playerAddress: string,
  count: number
): Promise<TxData> => {
  // create NFT Cotntract's method call data
  const minTx = await contract.populateTransaction.playGame(
    playerAddress,
    count
  );
  console.log("minTxData :", minTx.data);

  const txData: TxData = {
    to: contractAddress,
    data: minTx.data,
  };

  // create newArray
  console.log("txData :", txData);

  return txData;
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

////////////////////////////////////////////////////////
// NFT Contract
////////////////////////////////////////////////////////

export const createTransferNftTxData = (
  from: any,
  count: number,
  id: number
): TxData => {
  const encodedCall = encodeFunctionData({
    abi: parseAbi([
      "function safeTransferFrom(address from, address to, uint256 id, uint value, bytes data)",
    ]),
    functionName: "safeTransferFrom",
    args: [from, GAMECONTRACT_ADDRESS, BigInt(id), BigInt(count), "0x"],
  });

  const txData = {
    to: BATTLE_CARD_NFT_ADDRESS,
    data: encodedCall,
  };

  return txData;
};
