import {ethers} from "hardhat";

/**
 * モック用のサンプルVRFコントラクトのデプロイ
 */
async function main() {
  // デプロイに必要な変数
  const subscriptionId = 1434;
  const vrfCoordinator = "0x2eD832Ba664535e5886b75D64C46EB9a228C2610"; // Avalanche Fuji
  const keyHash =
    "0x354d2f95da55398f44b7cff77da56283d9c6c829a4bdf1bbcaf2ad6a4d081f61"; // Avalanche Fuji

  const sampleVRF = await ethers.deployContract("SampleVRF", [
    subscriptionId,
    vrfCoordinator,
    keyHash,
  ]);

  console.log(` ======================= start ========================= `);
  await sampleVRF.deployed();

  console.log(` SampleVRF deployed to ${sampleVRF.address}`);
  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
