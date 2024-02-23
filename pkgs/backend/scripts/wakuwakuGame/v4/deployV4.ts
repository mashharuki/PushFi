import { ethers } from 'hardhat';

/**
 * WakuWakuGame コントラクト デプロイスクリプト
 */
async function main() {

  // get signer
  const signer = (await ethers.getSigners())[0];
  // NFTContract address
  const nftAddress = "0x45892C0Cb0860f96BA6d36a8C0f967E517ab5105";
  const superNftAddress = "0xbD3125D66E1DCe724FdE41c561D7944Dafe328bC";
  const sampleVRFAddress = "0x2D74e80Fb6E7E3FFa8b23939a78619b40661c304";

  // create NFT & game contract
  const nft = await ethers.getContractAt('WakuWakuNFT', nftAddress);
  const superNft = await ethers.getContractAt('WakuWakuSuperNFT', superNftAddress);
  const game = await ethers.deployContract('WakuWakuGameV4', [await signer.getAddress(), sampleVRFAddress])

  console.log(` ======================= start ========================= `)
  await game.deployed()

  console.log(` WakuWakuGameV4 deployed to ${game.address}`)

  console.log(` NFT's ownership transfering from ${await signer.getAddress()} to ${game.address}`)
  await nft.transferOwnership(game.address);
  console.log(` NFT's ownership transfered from ${await signer.getAddress()} to ${game.address}`)

  console.log(` SuperNFT's ownership transfering from ${await signer.getAddress()} to ${game.address}`)
  await superNft.transferOwnership(game.address);
  console.log(` SuperNFT's ownership transfered from ${await signer.getAddress()} to ${game.address}`)
  console.log(` ======================== end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})