import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";
import {getProvider, getWallet} from "../deploy/utils";
import {ethers} from "ethers";
import {utils} from "zksync-ethers";

task("createGame", "create new game").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {
        WakuWakuNFT,
        WakuWakuSuperNFT,
        BattleCardNFT,
        WakuWakuGameV5,
        GeneralPaymaster,
      },
    } = loadDeployedContractAddresses(hre.network.name);

    // get wallet
    const provider = getProvider(hre);
    const wallet = getWallet(hre);
    // create contract
    const artifact = hre.artifacts.readArtifactSync("WakuWakuGameV5");
    const game = new ethers.Contract(WakuWakuGameV5, artifact.abi, wallet);

    // Game用の変数
    const gameName = "SampleGame";
    const cardNftSupply = 200;
    const enemyImgUrl =
      "https://bafkreie4o7bbfitr4vmuckphvmf7n3aettzb57necosjf3oo5e5syhcfgq.ipfs.w3s.link/";
    const enemyLife = 50;

    try {
      let paymasterBalance = await provider.getBalance(GeneralPaymaster);
      console.log(`Paymaster ETH balance is ${paymasterBalance.toString()}`);

      let walletBalance = await provider.getBalance(wallet.address);
      console.log(`Wallet ETH balance is ${walletBalance.toString()}`);

      const gasPrice = await provider.getGasPrice();

      // Encoding the "ApprovalBased" paymaster flow's input
      const paymasterParams = utils.getPaymasterParams(GeneralPaymaster, {
        type: "General",
        innerInput: new Uint8Array(),
      });

      // Estimate gas fee for mint transaction
      const gasLimit = await game.createGame.estimateGas(
        gameName,
        WakuWakuNFT,
        WakuWakuSuperNFT,
        BattleCardNFT,
        cardNftSupply,
        enemyImgUrl,
        enemyLife,
        {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
          },
        }
      );

      const fee = gasPrice * gasLimit;
      console.log("Transaction fee estimation is :>> ", fee.toString());

      console.log(`Create game via paymaster...`);

      const createGameTx = await game.createGame(
        gameName,
        WakuWakuNFT,
        WakuWakuSuperNFT,
        BattleCardNFT,
        cardNftSupply,
        enemyImgUrl,
        enemyLife,
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

      await createGameTx.wait();

      console.log("tx Hash:", createGameTx.hash);

      paymasterBalance = await provider.getBalance(GeneralPaymaster);

      console.log(
        `Paymaster ETH balance is now ${paymasterBalance.toString()}`
      );

      walletBalance = await provider.getBalance(wallet.address);
      console.log(`Wallet ETH balance is ${walletBalance.toString()}`);
    } catch (e) {
      console.error("err:", e);
    }
  }
);
