import { ethers } from 'hardhat';

/**
 * WakuWakuGame コントラクト デプロイスクリプト
 */
async function main() {

  // get signer
  const signer = (await ethers.getSigners())[0];

  const game = await ethers.deployContract('WakuWakuGame', [await signer.getAddress()])

  console.log(` ======================= start ========================= `)
  await game.deployed()

  console.log(` WakuWakuGame deployed to ${game.address}`)
  console.log(` ======================== end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})