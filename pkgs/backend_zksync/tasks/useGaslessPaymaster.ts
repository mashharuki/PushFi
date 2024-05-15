import {utils, Wallet} from "zksync-ethers";
import * as ethers from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";
import {getWallet, getProvider} from "./../deploy/utils";

// load env file
import dotenv from "dotenv";
import {task} from "hardhat/config";
dotenv.config();

task("useGaslessPaymaster", "use paymaster").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {GeneralPaymaster, MyERC20, Greeter},
    } = loadDeployedContractAddresses(hre.network.name);

    /**
     * getToken method
     */
    function getToken(hre: HardhatRuntimeEnvironment, wallet: Wallet) {
      const artifact = hre.artifacts.readArtifactSync("MyERC20");
      return new ethers.Contract(MyERC20, artifact.abi, wallet);
    }

    const provider = getProvider(hre);
    const wallet = getWallet(hre);

    console.log(
      `ERC20 token balance of the wallet before mint: ${await wallet.getBalance(
        MyERC20
      )}`
    );

    let paymasterBalance = await provider.getBalance(GeneralPaymaster);
    console.log(`Paymaster ETH balance is ${paymasterBalance.toString()}`);

    const gasPrice = await provider.getGasPrice();

    // create Greeter Contract
    const artifact = hre.artifacts.readArtifactSync("Greeter");
    const greeter = new ethers.Contract(Greeter, artifact.abi, wallet);

    // Encoding the "ApprovalBased" paymaster flow's input
    const paymasterParams = utils.getPaymasterParams(GeneralPaymaster, {
      type: "General",
      innerInput: new Uint8Array(),
    });

    // Estimate gas fee for mint transaction
    const gasLimit = await greeter.setGreeting.estimateGas("Hola, mundo!", {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paymasterParams,
      },
    });

    const fee = gasPrice * gasLimit;
    console.log("Transaction fee estimation is :>> ", fee.toString());

    console.log(`Minting 5 tokens for the wallet via paymaster...`);

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

    const erc20 = getToken(hre, wallet);

    console.log(
      `Paymaster ERC20 token balance is now ${await erc20.balanceOf(
        GeneralPaymaster
      )}`
    );
    paymasterBalance = await provider.getBalance(GeneralPaymaster);

    console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);
    console.log(
      `ERC20 token balance of the the wallet after mint: ${await wallet.getBalance(
        MyERC20
      )}`
    );
  }
);
