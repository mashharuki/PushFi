import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../../helper/contractsJsonHelper";

task("changeEnemyUrl", "change Game's EnemyUrl")
  .addParam("newurl", "new enemy url")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {WakuWakuGameV5},
    } = loadDeployedContractAddresses(hre.network.name);
    // create Example contract
    const game = await hre.ethers.getContractAt(
      "WakuWakuGameV5",
      WakuWakuGameV5
    );

    try {
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // change enemy url game
      const tx = await game.changeEnemyUrl(activeId, taskArgs.newurl);
      console.log("tx Hash:", tx.hash);
    } catch (e) {
      console.error("err:", e);
    }
  });
