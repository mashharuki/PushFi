import {ethers} from "hardhat";

/**
 * WakuWakuGame コントラクト デプロイスクリプト
 */
async function main() {
  // get signer
  const signer = (await ethers.getSigners())[0];
  // NFTContract address
  const nftAddress = "0xaBaeaD3662e18a5442199369BCa7d6e4B2f57Db1";
  const superNftAddress = "0x953ae606af2B695EEdF012c0358eB65233CFc4c1";
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
