import { getEnv } from "@/utils/getEnv";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { Wallet, ethers } from "ethers";

/**
 * Web3auth用のクラスファイルです。
 */
export class Web3auth {

  private web3auth: Web3Auth | null = null;
  private idToken: string | null = null;
  private chainId: number = 0;
  private rpcUrl: string | null = null;

  /**
   * Web3Auth用のインスタンスを作成するメソッド
   */
  async create(chainId: number, rpcUrl: string) {
    const web3AuthService = new Web3auth();
    // set 
    this.chainId = chainId;
    this.rpcUrl = rpcUrl;
    return web3AuthService;
  }

  /**
   * ログイン メソッド
   */
  async login() {
    // get env
    const env = await getEnv();
    this.web3auth = new Web3Auth({
      clientId: env.WEB3_AUTH_CLIENT_ID!,
      web3AuthNetwork: "testnet",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: this.chainId.toString(),
        rpcTarget: this.rpcUrl!
      },
    });
  
    // initModal
    await this.web3auth.initModal();
      
    await this.web3auth.connect();
    const authenticateUser = await this.web3auth.authenticateUser();
    // set idToken
    this.idToken = authenticateUser.idToken;

    // get privateKey
    const pKey = await this.getPrivateKey(this.web3auth.provider!);
    // Avalanche RPC
    const provider = new ethers.providers.JsonRpcProvider(this.rpcUrl!);
    // create Signer Object
    const signer = new Wallet(pKey, provider) as any;

    return signer;
  }

  /**
   * logout method
   */
  async logout() {
    // logout
    this.web3auth!.logout();
    this.idToken = null;
  }

  /**
   * getPrivateKey method
   * @param provider 
   * @returns 
   */
  private async getPrivateKey(provider: SafeEventEmitterProvider) {
    return (await provider.request({
      method: "private_key",
    })) as string;
  };
}