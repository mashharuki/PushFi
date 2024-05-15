import {expect} from "chai";
import {Wallet, Provider, Contract, utils} from "zksync-ethers";
import {Deployer} from "@matterlabs/hardhat-zksync-deploy";
import * as hre from "hardhat";
import * as ethers from "ethers";
import dotenv from "dotenv";

dotenv.config();

// test pk rich wallet from in-memory node
const PRIVATE_KEY =
  "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";

describe.only("GaslessPaymaster", function () {
  let provider: Provider;
  let wallet: Wallet;
  let deployer: Deployer;
  let emptyWallet: Wallet;
  let userWallet: Wallet;
  let ownerInitialBalance: BigInt;
  let paymaster: Contract;
  let greeter: Contract;
  let paymasterAddress: string;

  async function deployContract(
    deployer: Deployer,
    contract: string,
    params: any[]
  ): Promise<Contract> {
    const artifact = await deployer.loadArtifact(contract);
    return await deployer.deploy(artifact, params);
  }

  async function fundAccount(wallet: Wallet, address: string, amount: string) {
    await (
      await wallet.sendTransaction({
        to: address,
        value: ethers.parseEther(amount),
      })
    ).wait();
  }

  function setupDeployer(
    url: string,
    privateKey: string
  ): [Provider, Wallet, Deployer] {
    const provider = new Provider(url);
    const wallet = new Wallet(privateKey, provider);
    const deployer = new Deployer(hre, wallet);
    return [provider, wallet, deployer];
  }

  async function executeGreetingTransaction(user: Wallet) {
    const gasPrice = await provider.getGasPrice();
    const paymasterParams = utils.getPaymasterParams(paymasterAddress, {
      type: "General",
      innerInput: new Uint8Array(),
    });

    await greeter.connect(user);

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!", {
      maxPriorityFeePerGas: BigInt(0),
      maxFeePerGas: gasPrice,
      gasLimit: 6000000,
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams,
      },
    });

    await setGreetingTx.wait();
    return wallet.getBalance();
  }

  before(async function () {
    // @ts-ignore
    [provider, wallet, deployer] = setupDeployer(
      hre.config.networks.inMemoryNode.url,
      PRIVATE_KEY
    );
    // @ts-ignore
    emptyWallet = Wallet.createRandom();
    userWallet = new Wallet(emptyWallet.privateKey, provider);
    // deploy contract
    paymaster = await deployContract(deployer, "GeneralPaymaster", []);
    paymasterAddress = await paymaster.getAddress();
    // deploy greeter contract
    greeter = await deployContract(deployer, "Greeter", ["Hi"]);
    await fundAccount(wallet, paymasterAddress, "3");
    ownerInitialBalance = await wallet.getBalance();
  });

  it("Owner can update message for free", async function () {
    // call executeGreetingTransaction method
    const newBalance = await executeGreetingTransaction(userWallet);
    expect(await greeter.greet()).to.equal("Hola, mundo!");
    expect(newBalance).to.eql(ownerInitialBalance);
  });
});
