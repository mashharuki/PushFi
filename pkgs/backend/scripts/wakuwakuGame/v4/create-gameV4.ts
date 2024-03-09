import {ethers} from "hardhat";

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {
  // Deployed Contract address
  const contractAddress = "0x452D352bc79B7c1eF23AF28D4CF841267b55DE1B";
  // Game用の変数
  const gameName = "SampleGame";
  const goalCount = 5;
  const adverUrl =
    "https://bafkreidkyzvx746bw6465ky6wwmb23lbwqp6qbyeoosfdbi4osdkemtqle.ipfs.w3s.link/";
  const nftAddress = "0xaBaeaD3662e18a5442199369BCa7d6e4B2f57Db1";
  const superNftAddress = "0x953ae606af2B695EEdF012c0358eB65233CFc4c1";

  const game = await ethers.getContractAt("WakuWakuGameV4", contractAddress);

  console.log(` ======================= start ========================= `);
  const tx = await game.createGame(
    gameName,
    goalCount,
    superNftAddress,
    nftAddress,
    adverUrl
  );

  console.log(` WakuWakuGame created newGame at ${tx.hash}`);
  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
