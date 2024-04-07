import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../../helper/contractsJsonHelper";

task("getGameInfo", "get active ID game info").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get signer
    const signer = (await hre.ethers.getSigners())[0];
    const signerAddress = await signer.getAddress();
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
      // get game info
      const gameInfo = await game.games(activeId);
      console.log("gameInfo:", gameInfo);
      // get partipants info
      const partipants = await game.partipants(activeId, signerAddress);
      console.log("partipants:", partipants);
    } catch (e) {
      console.error("err:", e);
    }
  }
);
