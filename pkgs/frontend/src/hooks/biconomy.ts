import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { Bundler, IBundler } from '@biconomy/bundler';
import { DEFAULT_ECDSA_OWNERSHIP_MODULE, ECDSAOwnershipValidationModule } from "@biconomy/modules";
import {
  BiconomyPaymaster,
  IPaymaster,
} from '@biconomy/paymaster';
import { Signer } from "ethers";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto
} from '@biconomy/paymaster';
import { ethers } from "ethers";
import 'react-toastify/dist/ReactToastify.css';
import abi from "../utils/abi.json";
import { NFT_ADDRESS } from "./../utils/constants";
import { getEnv } from "@/utils/getEnv";


/**
 * Biconomy用のクラスファイルです。
 */
export class Biconomy { 

  private chainId: number = 0;
  private bundler: IBundler | null = null;
  private paymaster: IPaymaster | null = null;

  /**
   * クラスインスタンスを新しく生成するためのメソッド
   * @param selectedChainId 
   * @returns 
   */
  async create(selectedChainId: number) {
    const biconomyService = new Biconomy();
    await biconomyService.init(selectedChainId);

    return biconomyService;
  }

  /**
   * 初期化メソッド
   */
  init = async (selectedChainId: number) => {
    // 環境変数の値を取得
    const env = await getEnv();

    // chainIDをセット
    this.chainId = selectedChainId;
    // バンドラーやpaymasterの情報をセット
    this.bundler = new Bundler({
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${this.chainId.toString()}/${process.env.NEXT_PUBLIC_BICONOMY_BUNDLER_KEY!}`,    
      chainId: selectedChainId,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    })
    
    this.paymaster = new BiconomyPaymaster({
      paymasterUrl: `https://paymaster.biconomy.io/api/v1/${this.chainId.toString()}/${process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_KEY!}` 
    })
  }

  /**
   * createSmartWallet method
   * @param signer 
   */
  createSmartWallet = async(signer: Signer) => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await ECDSAOwnershipValidationModule.create({
      signer: signer, 
      moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE
    });

    let biconomySmartAccount = await BiconomySmartAccountV2.create({
      chainId: this.chainId,
      bundler: this.bundler!, 
      paymaster: this.paymaster!,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      defaultValidationModule: module,
      activeValidationModule: module
    })

    const smartContractAddress = await biconomySmartAccount.getAccountAddress();

    return {
      smartContractAddress,
      biconomySmartAccount
    };
  }

  /**
   * mint NFT method
   * @param smartAccount 
   * @param address 
   * @param provider 
   * @param to 
   * @returns 
   */
  mintNft = async (
    smartAccount: BiconomySmartAccountV2, 
    address: string, 
    provider: any, 
    to: string
  ) => {
    // NFTコントラクトのインスタンスを生成
    const contract = new ethers.Contract(
      NFT_ADDRESS,
      abi,
      provider,
    )

    try {
      // create NFT Cotntract's method call data
      const minTx = await contract.populateTransaction.safeMint(address);
      console.log(minTx.data);

      const tx1 = {
        to: to,
        data: minTx.data,
      };

      let userOp = await smartAccount.buildUserOp([tx1]);
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
        userOp.verificationGasLimit =
        paymasterAndDataResponse.verificationGasLimit;
        userOp.preVerificationGas =
        paymasterAndDataResponse.preVerificationGas;
      }
        
      const userOpResponse = await smartAccount.sendUserOp(userOp);
      console.log("userOpHash", userOpResponse);
      
      const { receipt } = await userOpResponse.wait(1);
      console.log("txHash", receipt.transactionHash);

      return receipt.transactionHash;
    } catch (err: any) {
      console.error("err", err);
      console.log("err:", err)
      return;
    }
  } 

  
}

