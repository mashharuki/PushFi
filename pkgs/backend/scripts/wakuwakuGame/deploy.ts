import {ethers} from "hardhat";

/**
 * WakuWakuGame コントラクト デプロイスクリプト
 */
async function main() {
  // get signer
  const signer = (await ethers.getSigners())[0];
  // NFTContract address
  const nftAddress = "0x36C1b81EB093aEdc6fF4288E7f8b12C400E97820";

  // create NFT & game contract
  const nft = await ethers.getContractAt("WakuWakuNFT", nftAddress);
  const game = await ethers.deployContract("WakuWakuGame", [
    await signer.getAddress(),
  ]);

  console.log(` ======================= start ========================= `);
  await game.deployed();

  console.log(` WakuWakuGame deployed to ${game.address}`);

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
  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
