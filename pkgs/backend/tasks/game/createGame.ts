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
    const cardNftSupply = 200;
    const enemyImgUrl =
      "https://bafkreie4o7bbfitr4vmuckphvmf7n3aettzb57necosjf3oo5e5syhcfgq.ipfs.w3s.link/";
    const enemyLife = 50;

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
