export const APP_TITLE = "Push Fi";
export const APP_DESCRIPTION = "This is a onchain game";
export const RPC_URL = "https://sepolia.era.zksync.dev";
export const GAMECONTRACT_ADDRESS =
  "0x4daa43F951b1993D2E5dd92F8f98A89017F69280"; // zkSync Sepolia
export const BATTLE_CARD_NFT_ADDRESS =
  "0x03b3E4Bc118E33987c77030FCE3593E65f6D1656"; // zkSync Sepolia
export const GENERAL_PAYMASTER_ADDRESS =
  "0x7A50E3a47640076966247b9F4905B784Bb60cd20"; // zkSync Sepolia
export const TESTNET_OPENSEA_BASE_URL = "https://testnet.rarible.com/user/";
export const GOOGLE_RECAPTCHA_API_BASE_URL =
  "https://www.google.com/recaptcha/api/siteverify";
export const GRAPHQL_API_ENDPOINT = `https://api.studio.thegraph.com/query/44992/pushfi-zksync/v0.0.1`;
export const BATTLE_CARD_IMAGE_URL =
  "https://bafkreihre2x3wz2wcj4b64bghrynsfz7plmm424qxycunughwf7xwtmqxu.ipfs.nftstorage.link/";

/**
 * 数字を16進数に変換するためのメソッド
 * @param decimalNumber 変換した数字
 * @returns
 */
export const decimalToHex = (decimalNumber: number): string => {
  if (
    isNaN(decimalNumber) ||
    !Number.isInteger(decimalNumber) ||
    decimalNumber < 0
  ) {
    throw new Error("Invalid input. Please provide a non-negative integer.");
  }

  const hexString = decimalNumber.toString(16);
  return "0x" + hexString.toUpperCase();
};
