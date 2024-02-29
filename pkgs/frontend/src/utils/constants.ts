export const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
export const GAMECONTRACT_ADDRESS = "0x23E4288DCEE0C901D5b7FD1e5EECF9c4Bb1b3cF4"; // Avanache
export const TESTNET_OPENSEA_BASE_URL = "https://testnets.opensea.io/ja/";
export const GAME_ID = 0;

/**
 * 数字を16進数に変換するためのメソッド
 * @param decimalNumber 変換した数字
 * @returns 
 */
export const decimalToHex = (
  decimalNumber: number
): string => {
  if (isNaN(decimalNumber) || !Number.isInteger(decimalNumber) || decimalNumber < 0) {
    throw new Error("Invalid input. Please provide a non-negative integer.");
  }

  const hexString = decimalNumber.toString(16);
  return "0x" + hexString.toUpperCase();
}