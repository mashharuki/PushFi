import { ethers } from 'hardhat';

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {

  // Deployed Contract address
  const contractAddress = "0xA95F8D0B4cAE1d58d73C5148c6c1EA60A6aC1eDB"
  // Game用の変数
  const gameName = "SampleGame";
  const goalCount = 5;
  const adverUrl = "https://bafkreidkyzvx746bw6465ky6wwmb23lbwqp6qbyeoosfdbi4osdkemtqle.ipfs.w3s.link/";
  const nftAddress = "0xe6776D35F703AE7aCBA88B6655263aAC3E069E7f"; 
  const superNftAddress = "0x8cCb17Eb75Ad18863F3aBDa11F3cDd075682338d";

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