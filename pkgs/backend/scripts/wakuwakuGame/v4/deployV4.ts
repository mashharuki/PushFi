import {ethers} from "hardhat";

/**
 * WakuWakuGame コントラクト デプロイスクリプト
 */
async function main() {
  // get signer
  const signer = (await ethers.getSigners())[0];
  // NFTContract address
  const nftAddress = "0x1ad7fce32EdB9A1b4bd7E250Fd90e03cD74cDe06";
  const superNftAddress = "0x822e253e3c239350799810E388DC45F371754CE1";
  const sampleVRFAddress = "0x877e07ddC0b95640cD009154ab9dA6a691Ee783b";

  // create NFT & game contract
  const nft = await ethers.getContractAt("WakuWakuNFT", nftAddress);
  const superNft = await ethers.getContractAt(
    "WakuWakuSuperNFT",
    superNftAddress
  );
  const game = await ethers.deployContract("WakuWakuGameV4", [
    await signer.getAddress(),
    sampleVRFAddress,
  ]);

  console.log(` ======================= start ========================= `);
  await game.deployed();

  console.log(` WakuWakuGameV4 deployed to ${game.address}`);

  console.log(
    ` NFT's ownership transfering from ${await signer.getAddress()} to ${
      game.address
    }`
  );
  await nft.transferOwnership(game.address);
  console.log(
    ` NFT's ownership transfered from ${await signer.getAddress()} to ${
      game.address
    }`
  );

  console.log(
    ` SuperNFT's ownership transfering from ${await signer.getAddress()} to ${
      game.address
    }`
  );
  await superNft.transferOwnership(game.address);
  console.log(
    ` SuperNFT's ownership transfered from ${await signer.getAddress()} to ${
      game.address
    }`
  );
  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
