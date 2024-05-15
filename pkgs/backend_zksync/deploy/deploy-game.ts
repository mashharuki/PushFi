import {Provider, Wallet} from "zksync-ethers";
import * as ethers from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {
  writeContractAddress,
  loadDeployedContractAddresses,
} from "../helper/contractsJsonHelper";

// load env file
import dotenv from "dotenv";
import {deployContract, getProvider, getWallet} from "./utils";
dotenv.config();

// load wallet private key from env file
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Game contract...`);

  // get Contract Address
  const {
    contracts: {WakuWakuNFT, WakuWakuSuperNFT, BattleCardNFT},
  } = loadDeployedContractAddresses(hre.network.name);

  // The wallet that will deploy the token and the paymaster
  // It is assumed that this wallet already has sufficient funds on zkSync
  const provider = getProvider(hre);
  const wallet = getWallet(hre);

  // Deploy the contract
  const wakuWakuGameV5 = await deployContract(hre, "WakuWakuGameV5", [
    wallet.address,
  ]);
  const wakuWakuGameV5Address = await wakuWakuGameV5.getAddress();
  console.log(`WakuWakuGameV5 address: ${wakuWakuGameV5Address}`);

  const artifact = hre.artifacts.readArtifactSync("WakuWakuNFT");
  const nft = new ethers.Contract(WakuWakuNFT, artifact.abi, wallet);
  const artifact2 = hre.artifacts.readArtifactSync("WakuWakuSuperNFT");
  const superNft = new ethers.Contract(WakuWakuSuperNFT, artifact2.abi, wallet);
  const artifact3 = hre.artifacts.readArtifactSync("BattleCardNFT");
  const cardNft = new ethers.Contract(BattleCardNFT, artifact3.abi, wallet);

  console.log(
    ` NFT's ownership transfering from ${wallet.address} to ${wakuWakuGameV5Address}`
  );
  await nft.transferOwnership(wakuWakuGameV5Address);
  console.log(
    ` NFT's ownership transfered from ${wallet.address} to ${wakuWakuGameV5Address}`
  );

  console.log(
    ` SuperNFT's ownership transfering from ${wallet.address} to ${wakuWakuGameV5Address}`
  );
  await superNft.transferOwnership(wakuWakuGameV5Address);
  console.log(
    ` SuperNFT's ownership transfered from ${wallet.address} to ${wakuWakuGameV5Address}`
  );

  console.log(
    ` BatteleCardNFT's ownership transfering from ${wallet.address} to ${wakuWakuGameV5Address}`
  );
  await cardNft.transferOwnership(wakuWakuGameV5Address);
  console.log(
    ` BatteleCardNFT's ownership transfered from ${wallet.address} to ${wakuWakuGameV5Address}`
  );

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "WakuWakuGameV5",
    value: wakuWakuGameV5Address,
    network: hre.network.name,
  });

  console.log(`Done!`);
}
