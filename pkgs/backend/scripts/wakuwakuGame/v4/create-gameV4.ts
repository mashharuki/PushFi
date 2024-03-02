import { ethers } from 'hardhat';

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {

  // Deployed Contract address
  const contractAddress = "0x23E4288DCEE0C901D5b7FD1e5EECF9c4Bb1b3cF4"
  // Game用の変数
  const gameName = "SampleGame";
  const goalCount = 5;
  const adverUrl = "https://bafkreidkyzvx746bw6465ky6wwmb23lbwqp6qbyeoosfdbi4osdkemtqle.ipfs.w3s.link/";
  const nftAddress = "0xBA54D522A30684ae8000D961F6d7e69207B3bFBb"; 
  const superNftAddress = "0x8Efc46682Db85924A69640e9AF919026db5481A1";

  const game = await ethers.getContractAt('WakuWakuGameV4', contractAddress);

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