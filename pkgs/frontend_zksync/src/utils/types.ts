export type TxData = {
  to: string;
  data: any;
};

export type EnemyInfo = {
  enemyImgUrl: string;
  enemyLife: number;
};

export type GameInfo = {
  cardNftSupply: string;
  currentSupply: string;
  enemyInfo_enemyImgUrl: string;
  enemyInfo_enemyLife: string;
  gameId: string;
  gameName: string;
  gameSeacon: string;
  normalNftAddress: string;
  openingStatus: boolean;
  superNftAddress: string;
  transactionHash: string;
  winner: string;
};

export type GameInfos = {
  gameCreateds: GameInfo[];
};

export type SupplyUpdate = {
  cardNftAddress: string;
  gameId: string;
  newSupply: string;
};

export type SupplyUpdates = {
  currentSupplyUpdateds: SupplyUpdate[];
};

export type AttackInfo = {
  attack: string;
  gameId: string;
  player: string;
  pushCount: string;
  result: string;
};

export type AttackInfos = {
  attacks: AttackInfo[];
};

export type CurrentSupplysInfo = {
  cardNftAddress: string;
  gameId: string;
  newSupply: string;
};

export type CurrentSupplysInfos = {
  currentSupplyUpdateds: CurrentSupplysInfo[];
};

export type EnemyLifeUpdatedInfo = {
  gameId: string;
  newEnemyLife: string;
};

export type EnemyLifeUpdatedInfos = {
  enemyLifeUpdateds: EnemyLifeUpdatedInfo[];
};

export type GameSeasonChangedInfo = {
  gameId: string;
  season: string;
};

export type GameSeasonChangedInfos = {
  gameSeasonChangeds: GameSeasonChangedInfo[];
};

export type GameFinishedInfo = {
  gameId: string;
  winner: string;
};

export type GameFinishedInfos = {
  gameFinisheds: GameFinishedInfo[];
};
