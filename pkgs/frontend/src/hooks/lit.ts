import { RPC_URL } from "@/utils/constants";
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers';
import { AuthMethodType, ProviderType } from "@lit-protocol/constants";
import {
  LitAuthClient,
  WebAuthnProvider,
} from "@lit-protocol/lit-auth-client/src/index.js";
import { LitNodeClientNodeJs } from "@lit-protocol/lit-node-client-nodejs";
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
import {
  AuthMethod,
  GetSessionSigsProps,
  IRelayPKP,
  SessionSigs
} from '@lit-protocol/types';
import { getEnv } from "@/utils/getEnv";

/**
 * Lit用のクラスファイルです。
 */
export class Lit {

  private litNodeClient: LitNodeClientNodeJs | null = null;
  private authClient: LitAuthClient | null = null;

  /**
   * Lit用のインスタンスを作成するメソッド
   */
  async create () {
    const litService = new Lit();
    await litService.init();

    return litService;
  }

  /**
   * 初期化メソッド
   */
  async init() {

    // 環境変数の値を取得
    const env = await getEnv();

    this.litNodeClient = new LitNodeClientNodeJs({
      litNetwork: "cayenne",
      debug: true,
    });
    
    var litNodeClient = this.litNodeClient;
    // Lit用のインスタンスを設定
    this.authClient = new LitAuthClient({
      litRelayConfig: {
        relayApiKey: env.NEXT_PUBLIC_LIT_RELAY_API_KEY,
      },
      litNodeClient,
    });
  }

  /**
   * 接続
   */
  async connect() {
    await this.litNodeClient!.connect();
  }

  /**
   * Generate session sigs for given params
   */
  async getSessionSigs({
    pkpPublicKey,
    authMethod,
    sessionSigsParams,
  }: {
    pkpPublicKey: string;
    authMethod: AuthMethod;
    sessionSigsParams: GetSessionSigsProps;
  }): Promise<SessionSigs> {
    await this.connect();
    const provider = this.getProviderByAuthMethod(authMethod);

    console.log("provider", provider);

    if (provider) {
      // get sessionSigs info
      const sessionSigs = await provider.getSessionSigs({
        pkpPublicKey,
        authMethod,
        sessionSigsParams,
      });
      return sessionSigs;
    } else {
      throw new Error(
        `Provider not found for auth method type ${authMethod.authMethodType}`
      );
    }
  }

  /**
   * Register new WebAuthn credential
   * ✨ very important
   */
  async registerWebAuthn(): Promise<IRelayPKP> {
    await this.connect();
    const provider = this.authClient!.initProvider<WebAuthnProvider>(
      ProviderType.WebAuthn
    );
    // Register new WebAuthn credential
    const options = await provider.register();

    // Verify registration and mint PKP through relay server
    const txHash = await provider.verifyAndMintPKPThroughRelayer(options);
    const response = await provider.relay.pollRequestUntilTerminalState(txHash);
    if (response.status !== 'Succeeded') {
      throw new Error('Minting failed');
    }
    // RealyPKP型のオブジェクトを生成
    const newPKP: IRelayPKP = {
      tokenId: response.pkpTokenId!,
      publicKey: response.pkpPublicKey!,
      ethAddress: response.pkpEthAddress!,
    };
    return newPKP;
  }

  /**
   * Get auth method object by authenticating with a WebAuthn credential
   */
  async authenticateWithWebAuthn(): Promise<AuthMethod | undefined> {
    await this.connect();
    let provider = this.authClient!.getProvider(ProviderType.WebAuthn);

    if (!provider) {
      provider = this.authClient!.initProvider<WebAuthnProvider>(
        ProviderType.WebAuthn
      );
    }
    const authMethod = await provider!.authenticate();
    return authMethod;
  }

  /**
   * Fetch PKPs associated with given auth method
   */
  async getPKPs(authMethod: AuthMethod): Promise<IRelayPKP[]> {
    await this.connect();
    const provider = this.getProviderByAuthMethod(authMethod);
    const pkpInfo = await provider!.fetchPKPsThroughRelayer(authMethod);
    console.log("pkpInfo:", pkpInfo);

    return pkpInfo;
  }

  /**
   * Mint a new PKP for current auth method
   */
  async mintPKP(): Promise<any> {
    await this.connect();
    const provider = this.authClient!.initProvider<WebAuthnProvider>(
      ProviderType.WebAuthn
    );

    const authMethod = await provider.authenticate();
    // get public key
    const publicKey = await provider.computePublicKeyFromAuthMethod(authMethod);
    console.log("local public key computed: ", publicKey);

    let claimResp = await provider.claimKeyId({
      authMethod,
    });
    console.log("claim response public key: ", claimResp.pubkey);  
    console.log("claim : ", claimResp);  
    
    return claimResp.pubkey;
  }

  /**
   * get PKP Wallet method
   */
  async getPkpWallet(
    pkpPublicKey: any, 
    authMethod: AuthMethod,
    // sessionSig: SessionSigs
  ): Promise<PKPEthersWallet> {

    // get sssionSig
    let provider = this.authClient!.getProvider(ProviderType.WebAuthn);

    console.log("provider:", provider)
    console.log("authMethod:", authMethod)

    const sessionSigs = await provider!.getSessionSigs({
      authMethod: authMethod,
      pkpPublicKey: pkpPublicKey,
      sessionSigsParams: {
        chain: 'ethereum',
        resourceAbilityRequests: [
          {
            resource: new LitActionResource('*'),
            ability: LitAbility.PKPSigning,
          },
        ],
      },
    });

    console.log("sessionSigs:", sessionSigs);

    // create PKP instance
    const pkpWallet = new PKPEthersWallet({
      pkpPubKey: pkpPublicKey,
      rpc: RPC_URL,
      controllerSessionSigs: sessionSigs
    });
    await pkpWallet.init();

    console.log("pkpWallet:", pkpWallet);
    console.log("pkpWallet's address:", await pkpWallet.getAddress());
    console.log("pkpWallet's add:", await pkpWallet.getAddress());

    return pkpWallet;
  }

  /**
   * Get provider for given auth method
   */
  getProviderByAuthMethod(authMethod: AuthMethod) {
    switch (authMethod.authMethodType) {
      case AuthMethodType.WebAuthn:
        return this.authClient!.getProvider(ProviderType.WebAuthn);
      default:
        return;
    }
  }
}
