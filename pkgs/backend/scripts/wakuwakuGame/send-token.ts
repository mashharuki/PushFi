import {ethers} from "hardhat";

/**
 * Gameに賞金を送金するためのスクリプト
 */
async function main() {
  // Deployed Contract address
  const contractAddress = "0x985e632298882212d91AB2C9c0d00D80b82880b7";
  // Game用の変数
  const prizeToken = "0x045aa885e04dab32316eA0B39Cda9c966A5d9845"; // test USDC
  const prizeValue = 100;

  const token = await ethers.getContractAt("USDCToken", prizeToken);

  console.log(` ======================= start ========================= `);
  const tx = await token.transfer(contractAddress, prizeValue);

  console.log(` send to Game Contract at ${tx.hash}`);
  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
