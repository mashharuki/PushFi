import { ResponseData } from "@/pages/api/env";
import { getEnv } from "@/utils/getEnv";
import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { Bundler } from '@biconomy/bundler';
import { DEFAULT_ECDSA_OWNERSHIP_MODULE, ECDSAOwnershipValidationModule } from "@biconomy/modules";
import {
  BiconomyPaymaster,
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto
} from '@biconomy/paymaster';
import { Signer } from "ethers";
import 'react-toastify/dist/ReactToastify.css';
import { TxData } from "./useContract";

var smartAccount: BiconomySmartAccountV2;

/**
 * createSmartWallet method
 * @param chainId
 * @param signer 
 */
export const createSmartWallet = async(
  chainId: number, 
  signer: Signer
) => {
  // getEnv info
  const env: ResponseData = await getEnv();
  // eslint-disable-next-line @next/next/no-assign-module-variable
  const module = await ECDSAOwnershipValidationModule.create({
    signer: signer, 
    moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE
  });

  // バンドラーやpaymasterの情報をセット
  const bundler = new Bundler({
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId.toString()}/${env.BICONOMY_BUNDLER_KEY}`,    
    chainId: chainId,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  })
  
  const paymaster = new BiconomyPaymaster({
    paymasterUrl: `https://paymaster.biconomy.io/api/v1/${chainId.toString()}/${env.BICONOMY_PAYMASTER_KEY}` 
  })
  
  let biconomySmartAccount = await BiconomySmartAccountV2.create({
    chainId: chainId,
    bundler: bundler!, 
    paymaster: paymaster!,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    defaultValidationModule: module,
    activeValidationModule: module
  })

  const smartContractAddress = await biconomySmartAccount.getAccountAddress();

  smartAccount = biconomySmartAccount;

  return {
    smartContractAddress,
  };
}

/**
 * sendUserOp method
 * @param txData 
 * @returns 
 */
export const sendUserOp = async (
  txData: TxData
) => {
  try {
    let userOp = await smartAccount.buildUserOp([txData]);
    console.log({ userOp })
    
    const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
    
    let paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
      smartAccountInfo: {
        name: 'BICONOMY',
        version: '2.0.0'
      },
      calculateGasLimits: true
    };

    const paymasterAndDataResponse =
      await biconomyPaymaster.getPaymasterAndData(
        userOp,
        paymasterServiceData
      );

    userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

    if (
      paymasterAndDataResponse.callGasLimit &&
      paymasterAndDataResponse.verificationGasLimit &&
      paymasterAndDataResponse.preVerificationGas
    ) {
      userOp.callGasLimit = paymasterAndDataResponse.callGasLimit;
      userOp.verificationGasLimit = paymasterAndDataResponse.verificationGasLimit;
      userOp.preVerificationGas = paymasterAndDataResponse.preVerificationGas;
    }
      
    const userOpResponse = await smartAccount.sendUserOp(userOp);
    console.log("userOpHash", userOpResponse);
    
    const { receipt } = await userOpResponse.wait(1);
    console.log("txHash", receipt.transactionHash);

    return receipt.transactionHash;
  } catch (err: any) {
    console.error("sending UserOp err... :", err);
    return;
  }
}   


