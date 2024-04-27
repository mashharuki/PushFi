export type TxData = {
  to: string;
  data: any;
};

export type EnemyInfo = {
  enemyImgUrl: string;
  enemyLife: number;
};

export type GameInfo = {
  gameName: string;
  gameSeacon: number;
  openingStatus: boolean;
  normalNftAddress: string;
  superNftAddress: string;
  cardNftAddress: string;
  cardNftSupply: number;
  currentSupply: number;
  winner: number;
  enemyInfo: EnemyInfo;
};
