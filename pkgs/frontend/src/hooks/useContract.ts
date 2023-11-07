import { Contract, ContractInterface, ethers } from "ethers";

export type TxData = {
  to: string;
  data: any;
}

export type GameInfo = {
  gameName: string;
  currentCount: number;
  goalCount: number;
  openingStatus: boolean;
  prizeToken: string;
  prizeValue: number;
  nftAddress: string;
  winner: string;
}

var contractAddress: string;
var contract: Contract;

/**
 * 初期化メソッド
 */
export const createContract = (
  address: string,
  abi: ContractInterface,
  rpcUrl: string
) => {
  // create provider
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  // コントラクトのインスタンスを生成
  contract = new ethers.Contract(
    address,
    abi,
    provider,
  );

  contractAddress = address;
}

/**
 * createPlayGameTxData method
 */
export const createPlayGameTxData = async (
  gameId: number,
  playerAddress: string  
): Promise<TxData> => {
  // create NFT Cotntract's method call data
  const minTx = await contract.populateTransaction.playGame(gameId, playerAddress);
  console.log("txData :", minTx.data);

  const txData: TxData = {
    to: contractAddress,
    data: minTx.data,
  };

  return txData;
}

/**
 * getGameStatus method
 */
export const getGameStatus = async(
  gameId: number
): Promise<boolean> => {
  // get gameStatus
  const result = await contract.getOpeningStatus(gameId);
  return result;
}

/**
 * getGameInfo method
 */
export const getGameInfo = async(
  gameId: number
): Promise<GameInfo> => {
  // get gameStatus
  const result: GameInfo = await contract.games(gameId);

  console.log("gameInfo:", result);

  return result;
}