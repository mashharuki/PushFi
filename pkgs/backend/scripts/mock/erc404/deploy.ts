import {ethers, network, run} from "hardhat";
import {writeContractAddress} from "../../../helper/contractsJsonHelper";

/**
 * モック用のサンプルVRFコントラクトのデプロイ
 */
async function main() {
  // get signer
  const signers = await ethers.getSigners();
  const example = await ethers.deployContract("Example", [signers[0].address]);

  console.log(` ======================= start ========================= `);
  await example.deployed();

  console.log(` Example deployed to ${example.address}`);

  if (network.name == "fuji") {
    await run(`verify:verify`, {
      contract: "contracts/mock/erc404/Example.sol:Example",
      address: example.address,
      constructorArguments: [signers[0].address],
    });
  }

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "Example",
    value: example.address,
    network: network.name,
  });
  console.log(` ======================== end  ======================== `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
