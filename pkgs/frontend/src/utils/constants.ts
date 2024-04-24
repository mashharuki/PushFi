export const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
export const GAMECONTRACT_ADDRESS =
  "0x530b265Ad60C9d7637321cA2B8A660006F28A297"; // Avanache
export const TESTNET_OPENSEA_BASE_URL = "https://testnets.opensea.io/ja/";
export const GAME_ID = 0;
export const GRAPHQL_API_ENDPOINT = `https://api.studio.thegraph.com/query/44992/pushfi/"v0.0.1"`;

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
