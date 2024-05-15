import {writeContractAddress} from "../helper/contractsJsonHelper";
import {deployContract} from "./utils";
import {HardhatRuntimeEnvironment} from "hardhat/types";

// An example of a basic deploy script
// It will deploy a Greeter contract to selected network
// as well as verify it on Block Explorer if possible for the network
export default async function (hre: HardhatRuntimeEnvironment) {
  const contractArtifactName = "Greeter";
  const constructorArguments = ["Hi there!"];
  const greeter = await deployContract(
    hre,
    contractArtifactName,
    constructorArguments
  );

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "Greeter",
    value: greeter.target as any,
    network: hre.network.name,
  });
}
