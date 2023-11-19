import { ethers } from 'hardhat';

/**
 * WakuWakuGame コントラクト デプロイスクリプト
 */
async function main() {

  // get signer
  const signer = (await ethers.getSigners())[0];
  // NFTContract address
  const nftAddress = "";
  const superNftAddress = "";

  // create NFT & game contract
  const nft = await ethers.getContractAt('WakuWakuNFT', nftAddress);
  const superNft = await ethers.getContractAt('WakuWakuSuperNFT', superNftAddress);
  const game = await ethers.deployContract('WakuWakuGameV2', [await signer.getAddress()])

  console.log(` ======================= start ========================= `)
  await game.deployed()

  console.log(` WakuWakuGame deployed to ${game.address}`)

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