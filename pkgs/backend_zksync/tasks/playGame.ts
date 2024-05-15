import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";
import {ethers} from "ethers";
import {getProvider, getWallet} from "../deploy/utils";
import {utils} from "zksync-ethers";

task("playGame", "play game")
  .addParam("count", "push count")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {WakuWakuGameV5, BattleCardNFT, GeneralPaymaster},
    } = loadDeployedContractAddresses(hre.network.name);

    // get wallet
    const provider = getProvider(hre);
    const wallet = getWallet(hre);
    // create contract
    const artifact = hre.artifacts.readArtifactSync("WakuWakuGameV5");
    const game = new ethers.Contract(WakuWakuGameV5, artifact.abi, wallet);
    // create contract
    const artifact2 = hre.artifacts.readArtifactSync("BattleCardNFT");
    const cardNFT = new ethers.Contract(BattleCardNFT, artifact2.abi, wallet);

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

      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // シーズン2だったらまずgameコントラクトにNFTを預ける
      if (gameInfo[1] == 2) {
        const gasLimit = await cardNFT.safeTransferFrom.estimateGas(
          wallet.address,
          WakuWakuGameV5,
          activeId,
          taskArgs.count,
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

        console.log(`transfer NFT via paymaster...`);

        const safeTransferTx = await cardNFT.safeTransferFrom(
          wallet.address,
          WakuWakuGameV5,
          activeId,
          taskArgs.count,
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

        await safeTransferTx.wait();

        console.log("safe NFT tx Hash:", safeTransferTx.hash);
        paymasterBalance = await provider.getBalance(GeneralPaymaster);

        console.log(
          `Paymaster ETH balance is now ${paymasterBalance.toString()}`
        );

        walletBalance = await provider.getBalance(wallet.address);
        console.log(`Wallet ETH balance is ${walletBalance.toString()}`);
      }
      // play game
      const gasLimit = await game.playGame.estimateGas(
        wallet.address,
        taskArgs.count,
        {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
          },
        }
      );

      const fee = gasPrice * gasLimit;
      console.log("Transaction fee estimation is :>> ", fee.toString());

      console.log(`play game via paymaster...`);

      const playGameTx = await game.playGame(wallet.address, taskArgs.count, {
        maxPriorityFeePerGas: BigInt(0),
        maxFeePerGas: gasPrice,
        gasLimit: 6000000,
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      });

      console.log("tx Hash:", playGameTx.hash);

      paymasterBalance = await provider.getBalance(GeneralPaymaster);

      console.log(
        `Paymaster ETH balance is now ${paymasterBalance.toString()}`
      );

      walletBalance = await provider.getBalance(wallet.address);
      console.log(`Wallet ETH balance is ${walletBalance.toString()}`);
    } catch (e) {
      console.error("err:", e);
    }
  });
