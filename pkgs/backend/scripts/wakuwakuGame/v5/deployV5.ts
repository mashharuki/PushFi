import {ethers, network, run} from "hardhat";
import {
  loadDeployedContractAddresses,
  writeContractAddress,
} from "../../../helper/contractsJsonHelper";

/**
 * WakuWakuGameV5 コントラクト デプロイスクリプト
 */
async function main() {
  // get signer
  const signer = (await ethers.getSigners())[0];
  // get Contract Address
  const {
    contracts: {WakuWakuNFT, WakuWakuSuperNFT, BattleCardNFT},
  } = loadDeployedContractAddresses(network.name);
  // NFTContract address
  const nftAddress = WakuWakuNFT;
  const superNftAddress = WakuWakuSuperNFT;
  const battleCardNFTAddress = BattleCardNFT;

  const signerAddress = await signer.getAddress();

  // create NFT & game contract
  const nft = await ethers.getContractAt("WakuWakuNFT", nftAddress);
  const superNft = await ethers.getContractAt(
    "WakuWakuSuperNFT",
    superNftAddress
  );
  const cardNft = await ethers.getContractAt(
    "BattleCardNFT",
    battleCardNFTAddress
  );
  // deploy game contract
  const game = await ethers.deployContract("WakuWakuGameV5", [signerAddress]);

  console.log(` ======================= start ========================= `);
  await game.deployed();

  console.log(` WakuWakuGameV5 deployed to ${game.address}`);

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

  console.log(
    ` BatteleCardNFT's ownership transfering from ${signerAddress} to ${game.address}`
  );
  await cardNft.transferOwnership(game.address);
  console.log(
    ` BatteleCardNFT's ownership transfered from ${signerAddress} to ${game.address}`
  );

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "WakuWakuGameV5",
    value: game.address,
    network: network.name,
  });

  if (network.name == "fuji") {
    await run(`verify:verify`, {
      contract: "contracts/v5/WakuWakuGameV5.sol:WakuWakuGameV5",
      address: game.address,
      constructorArguments: [signerAddress],
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
