import { getEnv } from "@/utils/getEnv";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { Wallet, ethers } from "ethers";
import { ResponseData } from "@/pages/api/env";

// 変数
var web3auth: Web3Auth;
var idToken;

/**
 * ログイン メソッド
 */
export const login = async(
  chainId: number,
  rpcUrl: string
) => {
  // get env
  const env: ResponseData = await getEnv();

  web3auth = new Web3Auth({
    clientId: env.WEB3_AUTH_CLIENT_ID,
    web3AuthNetwork: "testnet",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0xA869", // hexにする必要あり(現在アバランチのものを指定)
      rpcTarget: rpcUrl
    },
  });

  // initModal
  await web3auth.initModal();
    
  await web3auth.connect();
  const authenticateUser = await web3auth.authenticateUser();
  // set idToken
  idToken = authenticateUser.idToken;

  // get privateKey
  const pKey = await getPrivateKey(web3auth.provider!);
  // Avalanche RPC
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl!);
  // create Signer Object
  const signer = new Wallet(pKey, provider) as any;

  return signer;
}

/**
 * logout method
 */
export const logout = async() => {
  // logout
  await web3auth.logout();
}

/**
 * getPrivateKey method
 * @param provider 
 * @returns 
 */
const getPrivateKey = async(provider: SafeEventEmitterProvider) => {
  return (await provider.request({
    method: "private_key",
  })) as string;
};
