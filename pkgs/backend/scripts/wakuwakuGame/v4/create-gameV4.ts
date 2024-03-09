import {ethers} from "hardhat";

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {
  // Deployed Contract address
  const contractAddress = "0x530b265Ad60C9d7637321cA2B8A660006F28A297";
  // Game用の変数
  const gameName = "SampleGame";
  const goalCount = 5;
  const adverUrl =
    "https://bafkreidkyzvx746bw6465ky6wwmb23lbwqp6qbyeoosfdbi4osdkemtqle.ipfs.w3s.link/";
  const nftAddress = "0x1ad7fce32EdB9A1b4bd7E250Fd90e03cD74cDe06";
  const superNftAddress = "0x822e253e3c239350799810E388DC45F371754CE1";

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
