import { ethers } from 'hardhat';

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {

  // Deployed Contract address
  const contractAddress = "0xf0611189992fb2d5487bdbfcb076194fe372c992"
  // Game用の変数
  const gameName = "SampleGame";
  const goalCount = 5;
  const adverUrl = "https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif";
  const nftAddress = "0x7518C6Ca099673C41890f0f2dAd7a6797e201bA4"; 
  const superNftAddress = "0x96cf27b3EfA3DbE9890b0a299A072F7Ff8adf0Ab";

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