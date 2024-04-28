import {ethers, network, run} from "hardhat";
import {
  loadDeployedContractAddresses,
  writeContractAddress,
} from "../../../helper/contractsJsonHelper";

/**
 * WakuWakuGame コントラクト デプロイスクリプト
 */
async function main() {
  // get signer
  const signer = (await ethers.getSigners())[0];
  // get Contract Address
  const {
    contracts: {WakuWakuNFT, WakuWakuSuperNFT, SampleVRF},
  } = loadDeployedContractAddresses(network.name);
  // NFTContract address
  const nftAddress = WakuWakuNFT;
  const superNftAddress = WakuWakuSuperNFT;
  const sampleVRFAddress = SampleVRF;

  const signerAddress = await signer.getAddress();

  // create NFT & game contract
  const nft = await ethers.getContractAt("WakuWakuNFT", nftAddress);
  const superNft = await ethers.getContractAt(
    "WakuWakuSuperNFT",
    superNftAddress
  );
  // deploy game contract
  const game = await ethers.deployContract("WakuWakuGameV4", [
    signerAddress,
    sampleVRFAddress,
  ]);

  console.log(` ======================= start ========================= `);
  await game.deployed();

  console.log(` WakuWakuGameV4 deployed to ${game.address}`);

  console.log(
    ` NFT's ownership transfering from ${signerAddress} to ${game.address}`
  );
  await nft.transferOwnership(game.address);
  console.log(
    ` NFT's ownership transfered from ${signerAddress} to ${game.address}`
  );

  console.log(
    ` SuperNFT's ownership transfering from ${signerAddress} to ${game.address}`
  );
  await superNft.transferOwnership(game.address);
  console.log(
    ` SuperNFT's ownership transfered from ${signerAddress} to ${game.address}`
  );

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "WakuWakuGameV4",
    value: game.address,
    network: network.name,
  });

  if (network.name == "scrollSepolia") {
    await run(`verify:verify`, {
      contract: "contracts/v4/WakuWakuGameV4.sol:WakuWakuGameV4",
      address: game.address,
      constructorArguments: [signerAddress, sampleVRFAddress],
    });
  }

  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
