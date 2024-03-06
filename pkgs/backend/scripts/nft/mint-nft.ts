import {ethers} from "hardhat";

/**
 * NFTをミントするためのスクリプト
 */
async function main() {
  // get signer
  const signer = (await ethers.getSigners())[0];
  // Deployed Contract address
  const contractAddress = "0x7518C6Ca099673C41890f0f2dAd7a6797e201bA4";
  const superNftcontractAddress = "0x96cf27b3EfA3DbE9890b0a299A072F7Ff8adf0Ab";

  const nft = await ethers.getContractAt("WakuWakuNFT", contractAddress);
  const superNft = await ethers.getContractAt(
    "WakuWakuSuperNFT",
    superNftcontractAddress
  );

  console.log(` ======================= start ========================= `);
  const tx = await nft.mint(await signer.getAddress(), 0, 1, "0x");
  const tx2 = await superNft.mint(await signer.getAddress(), 0, 1, "0x");

  console.log(` WakuWakuNFT minted NFT at ${tx.hash}`);
  console.log(` WakuWakuSuperNFT minted NFT at ${tx2.hash}`);
  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
