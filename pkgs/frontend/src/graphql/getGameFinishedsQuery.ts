import {gql} from "urql";

// subgraph query
const getGameFinishedsQuery = gql`
  query MyQuery($gameId: Int!) {
    gameFinisheds(
      orderBy: gameId
      orderDirection: desc
      first: 1
      where: {gameId: $gameId}
    ) {
      gameId
      winner
    }
  }
`;

export default getGameFinishedsQuery;
