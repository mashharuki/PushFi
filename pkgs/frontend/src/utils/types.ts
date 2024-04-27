export type TxData = {
  to: string;
  data: any;
};

export type GameInfo = {
  gameName: string;
  currentCount: number;
  goalCount: number;
  openingStatus: boolean;
  superNftAddress: string;
  nftAddress: string;
  winner: string;
  adverUrl: string;
};
