import {gql} from "urql";

// subgraph query
const getGameSeasonChangedInfoQuery = gql`
  query MyQuery($gameId: Int!) {
    gameSeasonChangeds(
      orderBy: gameId
      orderDirection: desc
      where: {gameId: $gameId}
    ) {
      gameId
      season
    }
  }
`;

export default getGameSeasonChangedInfoQuery;
