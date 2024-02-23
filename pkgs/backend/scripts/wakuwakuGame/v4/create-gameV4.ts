import { ethers } from 'hardhat';

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {

  // Deployed Contract address
  const contractAddress = "0x8AEE6a26FE5B7321a0bC2c5DEf357b9be4869ebD"
  // Game用の変数
  const gameName = "SampleGame";
  const goalCount = 5;
  const adverUrl = "https://bafkreidkyzvx746bw6465ky6wwmb23lbwqp6qbyeoosfdbi4osdkemtqle.ipfs.w3s.link/";
  const nftAddress = "0x5344EA80F5e23d06412Aa83CDE85344A6AF7256D"; 
  const superNftAddress = "0x3e39DaaC436990E8eCb72849D43f81F3b9E7E610";

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