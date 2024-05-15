import {Provider, Wallet} from "zksync-ethers";
import * as ethers from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Deployer} from "@matterlabs/hardhat-zksync-deploy";
import {writeContractAddress} from "../helper/contractsJsonHelper";

// load env file
import dotenv from "dotenv";
import {deployContract, getProvider, getWallet} from "./utils";
dotenv.config();

// load wallet private key from env file
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the NFT contract...`);

  // The wallet that will deploy the token and the paymaster
  // It is assumed that this wallet already has sufficient funds on zkSync
  const provider = getProvider(hre);
  const wallet = getWallet(hre);

  // Deploy the contract
  const wakuWakuNFT = await deployContract(hre, "WakuWakuNFT", [
    wallet.address,
  ]);
  const wakuWakuNFTAddress = await wakuWakuNFT.getAddress();
  console.log(`WakuWakuNFT address: ${wakuWakuNFTAddress}`);
  const wakuWakuSuperNFT = await deployContract(hre, "WakuWakuSuperNFT", [
    wallet.address,
  ]);
  const wakuWakuSuperNFTAddress = await wakuWakuSuperNFT.getAddress();
  console.log(`WakuWakuSuperNFT address: ${wakuWakuSuperNFTAddress}`);
  const battleCardNFT = await deployContract(hre, "BattleCardNFT", [
    wallet.address,
  ]);
  const battleCardNFTAddress = await battleCardNFT.getAddress();
  console.log(`BattleCardNFT address: ${battleCardNFTAddress}`);

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "WakuWakuNFT",
    value: wakuWakuNFTAddress,
    network: hre.network.name,
  });
  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "WakuWakuSuperNFT",
    value: wakuWakuSuperNFTAddress,
    network: hre.network.name,
  });
  writeContractAddress({
    group: "contracts",
    name: "BattleCardNFT",
    value: battleCardNFTAddress,
    network: hre.network.name,
  });

  console.log(`Done!`);
}
