import {ethers, network} from "hardhat";
import {loadDeployedContractAddresses} from "../../../helper/contractsJsonHelper";

/**
 * 新しくゲームを作成するためのスクリプト
 */
async function main() {
  // get Contract Address
  const {
    contracts: {WakuWakuNFT, WakuWakuSuperNFT, BattleCardNFT, WakuWakuGameV5},
  } = loadDeployedContractAddresses(network.name);

  // Game用の変数
  const gameName = "SampleGame";
  const cardNftSupply = 1000;
  const enemyImgUrl =
    "https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif";
  const enemyLife = 250;

  const game = await ethers.getContractAt("WakuWakuGameV5", WakuWakuGameV5);

  console.log(` ======================= start ========================= `);
  // create game
  const tx = await game.createGame(
    gameName,
    WakuWakuNFT,
    WakuWakuSuperNFT,
    BattleCardNFT,
    cardNftSupply,
    enemyImgUrl,
    enemyLife
  );

  console.log(` WakuWakuGameV5 created newGame at ${tx.hash}`);
  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
