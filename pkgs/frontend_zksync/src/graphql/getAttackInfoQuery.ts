import {gql} from "urql";

// subgraph query
const getAttackInfoQuery = gql`
  query MyQuery($gameId: Int!) {
    attacks(
      orderBy: blockTimestamp
      orderDirection: desc
      where: {gameId: $gameId}
    ) {
      gameId
      player
      pushCount
      attack
      result
    }
  }
`;

export default getAttackInfoQuery;
