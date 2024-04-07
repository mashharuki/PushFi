import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../../helper/contractsJsonHelper";

task("playGame", "play game").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get signer
    const signer = (await hre.ethers.getSigners())[0];
    const signerAddress = await signer.getAddress();
    // get Contract Address
    const {
      contracts: {WakuWakuGameV5, BattleCardNFT},
    } = loadDeployedContractAddresses(hre.network.name);
    // create Example contract
    const game = await hre.ethers.getContractAt(
      "WakuWakuGameV5",
      WakuWakuGameV5
    );
    // create cardNFT
    const cardNFT = await hre.ethers.getContractAt(
      "BattleCardNFT",
      BattleCardNFT
    );

    try {
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // シーズン2だったらまずgameコントラクトにNFTを預ける
      if (gameInfo.gameSeacon.toNumber() == 2) {
        // NFTをコントラクトに渡す
        const tx = await cardNFT.safeTransferFrom(
          signerAddress,
          game.address,
          activeId,
          250,
          "0x"
        );
        console.log("safe NFT tx Hash:", tx.hash);
      }
      // play game
      const tx = await game.playGame(signerAddress, 250);
      console.log("tx Hash:", tx.hash);
    } catch (e) {
      console.error("err:", e);
    }
  }
);
