import { ethers } from 'hardhat'

/**
 * NFTコントラクトデプロイスクリプト
 */
async function main() {

  // get signer
  const signer = (await ethers.getSigners())[0];

  const nft = await ethers.deployContract('WakuWakuNFT', [await signer.getAddress()])

  console.log(` ======================= start ========================= `)
  await nft.deployed()

  console.log(` WakuWakuNFT deployed to ${nft.address}`)
  console.log(` ======================== end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})