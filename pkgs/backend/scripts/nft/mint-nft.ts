import { ethers } from 'hardhat'

/**
 * NFTをミントするためのスクリプト
 */
async function main() {

  // get signer
  const signer = (await ethers.getSigners())[0];
  // Deployed Contract address
  const contractAddress = "0x36C1b81EB093aEdc6fF4288E7f8b12C400E97820"

  const nft = await ethers.getContractAt('WakuWakuNFT', contractAddress);

  console.log(` ======================= start ========================= `)
  const tx = await nft.mint(await signer.getAddress(), 0, 1, '0x')

  console.log(` WakuWakuNFT minted NFT at ${tx.hash}`)
  console.log(` ======================== end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})