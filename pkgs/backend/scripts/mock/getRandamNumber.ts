import { ethers } from 'hardhat';

/**
 * Chainlinkを使って乱数を生成するサンプルコード
 */
async function main() {

  // Deployed Contract address
  const sampleVDRAddress = "0x877e07ddC0b95640cD009154ab9dA6a691Ee783b"
  
  const sampleVRF = await ethers.getContractAt('SampleVRF', sampleVDRAddress);


  console.log(` ======================= start ========================= `)
  // const tx = await sampleVRF.requestRandomWords(); // リクエストする。
  // console.log(`SampleVRF requestRandomWords at ${tx.hash}`);

  // get randamNumber
  const randamNumber = await sampleVRF.s_randomWords(0);
  console.log(`randamNumber: ${randamNumber}`);
  
  console.log(` ======================== end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})