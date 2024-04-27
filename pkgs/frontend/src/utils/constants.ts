export const APP_TITLE = "Push Fi";
export const APP_DESCRIPTION = "This is a onchain game";
// export const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
export const RPC_URL = "https://rpc.ankr.com/base_sepolia";
// export const GAMECONTRACT_ADDRESS = "0x530b265Ad60C9d7637321cA2B8A660006F28A297"; // Avanache fuji
export const GAMECONTRACT_ADDRESS =
  "0xa9322C8424580E0b38F3E90FdDC73e009609fB4b"; // Base Sepolia
export const TESTNET_OPENSEA_BASE_URL = "https://testnets.opensea.io/ja/";
export const GAME_ID = 0;
export const GOOGLE_RECAPTCHA_API_BASE_URL =
  "https://www.google.com/recaptcha/api/siteverify";
export const GRAPHQL_API_ENDPOINT = `https://api.studio.thegraph.com/query/44992/pushfi2/v1`;

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
