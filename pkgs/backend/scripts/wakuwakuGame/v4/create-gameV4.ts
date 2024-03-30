import {ethers, network} from "hardhat";
import {loadDeployedContractAddresses} from "../../../helper/contractsJsonHelper";

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {
  // get Contract Address
  const {
    contracts: {WakuWakuNFT, WakuWakuSuperNFT, WakuWakuGameV4},
  } = loadDeployedContractAddresses(network.name);

  // Game用の変数
  const gameName = "SampleGame";
  const goalCount = 5;
  const adverUrl =
    "https://bafkreidkyzvx746bw6465ky6wwmb23lbwqp6qbyeoosfdbi4osdkemtqle.ipfs.w3s.link/";
  const nftAddress = WakuWakuNFT;
  const superNftAddress = WakuWakuSuperNFT;

  const game = await ethers.getContractAt("WakuWakuGameV4", WakuWakuGameV4);

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
