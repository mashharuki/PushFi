import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";
import {getWallet} from "../deploy/utils";
import {ethers} from "ethers";

task("getGameInfo", "get active ID game info").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {WakuWakuGameV5},
    } = loadDeployedContractAddresses(hre.network.name);

    // get wallet
    const wallet = getWallet(hre);
    // create contract
    const artifact = hre.artifacts.readArtifactSync("WakuWakuGameV5");
    const game = new ethers.Contract(WakuWakuGameV5, artifact.abi, wallet);

    try {
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      console.log("gameInfo:", gameInfo);
      // get partipants info
      const partipants = await game.partipants(activeId, wallet.address);
      console.log("partipants:", partipants);
    } catch (e) {
      console.error("err:", e);
    }
  }
);
