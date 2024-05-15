import {utils, Wallet} from "zksync-ethers";
import * as ethers from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";
import {getWallet, getProvider} from "./../deploy/utils";

// load env file
import dotenv from "dotenv";
import {task} from "hardhat/config";
dotenv.config();

task("usePaymaster", "use paymaster").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {MyPaymaster, MyERC20},
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

    let paymasterBalance = await provider.getBalance(MyPaymaster);
    console.log(`Paymaster ETH balance is ${paymasterBalance.toString()}`);

    const erc20 = getToken(hre, wallet);
    const gasPrice = await provider.getGasPrice();

    // Encoding the "ApprovalBased" paymaster flow's input
    const paymasterParams = utils.getPaymasterParams(MyPaymaster, {
      type: "ApprovalBased",
      token: MyERC20,
      // set minimalAllowance as we defined in the paymaster contract
      minimalAllowance: BigInt("1"),
      // empty bytes as testnet paymaster does not use innerInput
      innerInput: new Uint8Array(),
    });

    // Estimate gas fee for mint transaction
    const gasLimit = await erc20.mint.estimateGas(wallet.address, 5, {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paymasterParams,
      },
    });

    const fee = gasPrice * gasLimit;
    console.log("Transaction fee estimation is :>> ", fee.toString());

    console.log(`Minting 5 tokens for the wallet via paymaster...`);
    await (
      await erc20.mint(wallet.address, 5, {
        // paymaster info
        customData: {
          paymasterParams: paymasterParams,
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        },
      })
    ).wait();

    console.log(
      `Paymaster ERC20 token balance is now ${await erc20.balanceOf(
        MyPaymaster
      )}`
    );
    paymasterBalance = await provider.getBalance(MyPaymaster);

    console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);
    console.log(
      `ERC20 token balance of the the wallet after mint: ${await wallet.getBalance(
        MyERC20
      )}`
    );
  }
);
