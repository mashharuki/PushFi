import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../../helper/contractsJsonHelper";

task("404mint", "transfer ERC20 token & mint NFT")
  .addParam("to", "to address")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {Example},
    } = loadDeployedContractAddresses(hre.network.name);
    // create Example contract
    const example = await hre.ethers.getContractAt("Example", Example);

    try {
      const amount = BigInt(1 * 10 ** 18);
      // transfer 1000 FT & mint NFT
      const tx = await example.transfer(taskArgs.to, amount);
      console.log("tx hash:", tx.hash);
    } catch (e) {
      console.error("err:", e);
    }
  });
