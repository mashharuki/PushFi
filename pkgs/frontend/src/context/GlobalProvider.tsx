import { ResponseData } from "@/pages/api/env";
import { getEnv } from "@/utils/getEnv";
import { verifyRecaptcha } from "@/utils/verifyRecaptcha";
import {
  BiconomySmartAccountV2,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { Bundler } from "@biconomy/bundler";
import { ChainId } from "@biconomy/core-types";
import {
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
  ECDSAOwnershipValidationModule,
} from "@biconomy/modules";
import {
  BiconomyPaymaster,
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from "@biconomy/paymaster";
import { Signer } from "ethers";
import React, { createContext, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TxData } from "./../utils/types";

export const GlobalContext = createContext<any>({});

/**
 * GlobalProvider
 * @param param0
 * @returns
 */
export const GlobalProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(ChainId.AVALANCHE_TESTNET);
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2>();
  const [smartAddress, setSmartAddress] = useState<string>();
  const [verifyFlg, setVerifyFlg] = useState<boolean>(false);
  // reCAPTCHAからtokenを取得する No.2の処理
  const { executeRecaptcha } = useGoogleReCaptcha();

  /**
   * reCAPTCHA method
   */
  const reCaptcha = async () => {
    if (executeRecaptcha) {
      try {
        setLoading(true);
        const token: string = await executeRecaptcha("login");
        // ReCaptchaによる検証を実施
        const responceJson_recaptcha = await verifyRecaptcha(token);
        console.log("responce_server:", responceJson_recaptcha);
        setVerifyFlg(responceJson_recaptcha.success);

        toast.success("🦄 Verify Success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (err) {
        console.error("error:", err);
        toast.error("Verify Failed....", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  /**
   * createSmartWallet method
   * @param chainId
   * @param signer
   */
  const createSmartWallet = async (chainId: number, signer: Signer) => {
    // getEnv info
    const env: ResponseData = await getEnv();
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await ECDSAOwnershipValidationModule.create({
      signer: signer,
      moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
    });

    // バンドラーやpaymasterの情報をセット
    const bundler = new Bundler({
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId.toString()}/${
        env.BICONOMY_BUNDLER_KEY
      }`,
      chainId: chainId,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    });

    const paymaster = new BiconomyPaymaster({
      paymasterUrl: `https://paymaster.biconomy.io/api/v1/${chainId.toString()}/${
        env.BICONOMY_PAYMASTER_KEY
      }`,
    });

    let biconomySmartAccount = await BiconomySmartAccountV2.create({
      chainId: chainId,
      bundler: bundler!,
      paymaster: paymaster!,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      defaultValidationModule: module,
      activeValidationModule: module,
    });

    const smartContractAddress = await biconomySmartAccount.getAccountAddress();
    setSmartAccount(biconomySmartAccount);
    setSmartAddress(smartContractAddress);

    console.log("smartWalletAddress:", smartContractAddress);

    return {
      smartContractAddress,
    };
  };

  /**
   * sendUserOp method
   * @param txData
   * @returns
   */
  const sendUserOp = async (txData: TxData) => {
    try {
      let userOp = await smartAccount!.buildUserOp([txData]);
      console.log({ userOp });

      const biconomyPaymaster = smartAccount!
        .paymaster as IHybridPaymaster<SponsorUserOperationDto>;

      let paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
        smartAccountInfo: {
          name: "BICONOMY",
          version: "2.0.0",
        },
        calculateGasLimits: true,
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
        userOp.verificationGasLimit =
          paymasterAndDataResponse.verificationGasLimit;
        userOp.preVerificationGas = paymasterAndDataResponse.preVerificationGas;
      }

      const userOpResponse = await smartAccount!.sendUserOp(userOp);
      console.log("userOpHash", userOpResponse);

      const { receipt } = await userOpResponse.wait(1);
      console.log("txHash", receipt.transactionHash);

      return receipt.transactionHash;
    } catch (err: any) {
      console.error("sending UserOp err... :", err);
      return;
    }
  };

  //
  const global = {
    loading,
    setLoading,
    chainId,
    reCaptcha,
    verifyFlg,
    setVerifyFlg,
    createSmartWallet,
    sendUserOp,
    smartAddress,
    setSmartAddress,
  };

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  );
};
