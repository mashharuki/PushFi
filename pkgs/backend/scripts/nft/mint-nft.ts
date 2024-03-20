import {ethers, network} from "hardhat";
import {loadDeployedContractAddresses} from "../../helper/contractsJsonHelper";

/**
 * NFTをミントするためのスクリプト
 */
async function main() {
  // get signer
  const signer = (await ethers.getSigners())[0];

  // get Contract Address
  const {
    contracts: {WakuWakuNFT, WakuWakuSuperNFT},
  } = loadDeployedContractAddresses(network.name);

  const nft = await ethers.getContractAt("WakuWakuNFT", WakuWakuNFT);
  const superNft = await ethers.getContractAt(
    "WakuWakuSuperNFT",
    WakuWakuSuperNFT
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
