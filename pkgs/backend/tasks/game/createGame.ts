import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../../helper/contractsJsonHelper";

task("createGame", "create new game").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {WakuWakuNFT, WakuWakuSuperNFT, BattleCardNFT, WakuWakuGameV5},
    } = loadDeployedContractAddresses(hre.network.name);
    // create Example contract
    const game = await hre.ethers.getContractAt(
      "WakuWakuGameV5",
      WakuWakuGameV5
    );

    // Game用の変数
    const gameName = "SampleGame";
    const cardNftSupply = 1000;
    const enemyImgUrl =
      "https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif";
    const enemyLife = 250;

    try {
      // create game
      const tx = await game.createGame(
        gameName,
        WakuWakuNFT,
        WakuWakuSuperNFT,
        BattleCardNFT,
        cardNftSupply,
        enemyImgUrl,
        enemyLife
      );
      console.log("tx Hash:", tx.hash);
    } catch (e) {
      console.error("err:", e);
    }
  }
);
