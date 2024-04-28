import { ResponseData } from "@/pages/api/env";
import { getEnv } from "@/utils/getEnv";
import { verifyRecaptcha } from "@/utils/verifyRecaptcha";
import {
  BiconomySmartAccountV2,
  PaymasterMode,
  createSmartAccountClient,
} from "@biconomy/account";
import { Signer } from "ethers";
import React, { createContext, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseSepolia } from "viem/chains";
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
  const [chainId, setChainId] = useState<number>(84532);
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
    // Create Biconomy Smart Account instance
    const smartWallet = await createSmartAccountClient({
      signer,
      chainId: chainId,
      viemChain: baseSepolia,
      biconomyPaymasterApiKey: env.BICONOMY_PAYMASTER_KEY,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId.toString()}/${
        env.BICONOMY_BUNDLER_KEY
      }`,
    });

    const smartContractAddress = await smartWallet.getAccountAddress();
    setSmartAccount(smartWallet);
    setSmartAddress(smartContractAddress);

    console.log("biconomySmartAccount:", smartWallet);
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
      console.log("build userOp:");

      const userOpResponse = await smartAccount!.sendTransaction(txData, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log("Transaction Hash", transactionHash);

      // get receipt
      const userOpReceipt = await userOpResponse.wait(5);
      console.log("userOpReceipt", userOpReceipt);

      return transactionHash;
    } catch (err: any) {
      console.error("sending UserOp err... :", err);
      return;
    }
  };

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
