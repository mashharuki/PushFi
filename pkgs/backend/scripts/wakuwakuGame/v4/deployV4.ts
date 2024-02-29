import { ethers } from 'hardhat';

/**
 * WakuWakuGame コントラクト デプロイスクリプト
 */
async function main() {

  // get signer
  const signer = (await ethers.getSigners())[0];
  // NFTContract address
  const nftAddress = "0xBA54D522A30684ae8000D961F6d7e69207B3bFBb";
  const superNftAddress = "0x8Efc46682Db85924A69640e9AF919026db5481A1";
  const sampleVRFAddress = "0xab2191d3a9546eeef994823edb0aeca772042e20";

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