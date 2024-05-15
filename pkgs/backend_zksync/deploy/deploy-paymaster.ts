import {Wallet, Provider} from "zksync-ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Deployer} from "@matterlabs/hardhat-zksync-deploy";
import * as ethers from "ethers";
import {writeContractAddress} from "../helper/contractsJsonHelper";
import {deployContract, getWallet, getProvider} from "./utils";

// load env file
import dotenv from "dotenv";
dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

export default async function (hre: HardhatRuntimeEnvironment) {
  const provider = getProvider(hre);
  const wallet = getWallet(hre);

  // deploy token contract & paymaster contract
  const erc20 = await deployContract(hre, "MyERC20", [
    "MyToken",
    "MyToken",
    18,
  ]);
  const erc20Address = await erc20.getAddress();
  const paymaster = await deployContract(hre, "MyPaymaster", [erc20Address]);

  const paymasterAddress = await paymaster.getAddress();

  // Supplying paymaster with ETH
  console.log("Funding paymaster with ETH...");
  // send ETH
  await (
    await wallet.sendTransaction({
      to: paymasterAddress,
      value: ethers.parseEther("0.03"),
    })
  ).wait();
  // get balance of paymaster
  const paymasterBalance = await provider.getBalance(paymasterAddress);
  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

  // Supplying the ERC20 tokens to the wallet:
  // We will give the wallet 3 units of the token:
  await (await erc20.mint(wallet.address, 3)).wait();

  console.log("Minted 3 tokens for the wallet");

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "MyPaymaster",
    value: paymaster.target as any,
    network: hre.network.name,
  });

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "MyERC20",
    value: erc20.target as any,
    network: hre.network.name,
  });

  console.log(`Done!`);
}
