import {ethers, network, run} from "hardhat";
import {writeContractAddress} from "../../helper/contractsJsonHelper";

/**
 * NFTコントラクトデプロイスクリプト
 */
async function main() {
  // get signer
  const signer = (await ethers.getSigners())[0];
  const signerAddress = await signer.getAddress();

  const nft = await ethers.deployContract("WakuWakuNFT", [signerAddress]);
  const superNft = await ethers.deployContract("WakuWakuSuperNFT", [
    signerAddress,
  ]);

  const cardNft = await ethers.deployContract("BattleCardNFT", [signerAddress]);

  console.log(` ======================= start ========================= `);
  await nft.deployed();
  await superNft.deployed();
  await cardNft.deployed();

  console.log(` WakuWakuNFT deployed to ${nft.address}`);
  console.log(` WakuWakuSuperNFT deployed to ${superNft.address}`);
  console.log(` BattleCardNFT deployed to ${cardNft.address}`);

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "WakuWakuNFT",
    value: nft.address,
    network: network.name,
  });
  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "WakuWakuSuperNFT",
    value: superNft.address,
    network: network.name,
  });
  writeContractAddress({
    group: "contracts",
    name: "BattleCardNFT",
    value: cardNft.address,
    network: network.name,
  });

  if (network.name == "scrollSepolia") {
    await run(`verify:verify`, {
      contract: "contracts/WakuWakuNFT.sol:WakuWakuNFT",
      address: nft.address,
      constructorArguments: [signerAddress],
    });

    await run(`verify:verify`, {
      contract: "contracts/WakuWakuSuperNFT.sol:WakuWakuSuperNFT",
      address: superNft.address,
      constructorArguments: [signerAddress],
    });

    await run(`verify:verify`, {
      contract: "contracts/BattleCardNFT.sol:BattleCardNFT",
      address: cardNft.address,
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
