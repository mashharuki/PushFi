import {gql} from "urql";

// subgraph query
const getEnemyLifeUpdatedsQuery = gql`
  query MyQuery($gameId: Int!) {
    enemyLifeUpdateds(
      first: 1
      orderBy: blockTimestamp
      orderDirection: desc
      where: {gameId: $gameId}
    ) {
      gameId
      newEnemyLife
    }
  }
`;

export default getEnemyLifeUpdatedsQuery;
