import {ethers, network} from "hardhat";
import {loadDeployedContractAddresses} from "../../helper/contractsJsonHelper";

/**
 * Chainlinkを使って乱数を生成するサンプルコード
 */
async function main() {
  // get Contract Address
  const {
    contracts: {SampleVRF},
  } = loadDeployedContractAddresses(network.name);

  const sampleVRF = await ethers.getContractAt("SampleVRF", SampleVRF);

  console.log(` ======================= start ========================= `);
  // const tx = await sampleVRF.requestRandomWords(); // リクエストする。
  // console.log(`SampleVRF requestRandomWords at ${tx.hash}`);

  // get randamNumber
  const randamNumber = await sampleVRF.s_randomWords(0);
  console.log(`randamNumber: ${randamNumber}`);

  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
