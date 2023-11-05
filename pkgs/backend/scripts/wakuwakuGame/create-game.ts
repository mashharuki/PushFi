import { ethers } from 'hardhat';

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {

  // Deployed Contract address
  const contractAddress = ""
  // Game用の変数
  const gameName = "SampleGame";
  const goalCount = 10;
  const prizeToken = "0x045aa885e04dab32316eA0B39Cda9c966A5d9845"; // test USDC
  const prizeValue = 100;
  const nftAddress = "0x36C1b81EB093aEdc6fF4288E7f8b12C400E97820"

  const game = await ethers.getContractAt('WakuWakuGame', contractAddress);

  console.log(` ======================= start ========================= `)
  const tx = await game.createGame(gameName, goalCount, prizeToken, prizeValue, nftAddress);

  console.log(` WakuWakuGame created newGame at ${tx.hash}`)
  console.log(` ======================== end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})