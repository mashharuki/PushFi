import { ethers } from 'hardhat';

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {

  // Deployed Contract address
  const contractAddress = ""
  // Game用の変数
  const gameName = "SampleGame";
  const goalCount = 5;
  const adverUrl = "https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif";
  const nftAddress = ""; 
  const superNftAddress = "";

  const game = await ethers.getContractAt('WakuWakuGameV2', contractAddress);

  console.log(` ======================= start ========================= `)
  const tx = await game.createGame(gameName, goalCount, superNftAddress, nftAddress, adverUrl);

  console.log(` WakuWakuGame created newGame at ${tx.hash}`)
  console.log(` ======================== end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})