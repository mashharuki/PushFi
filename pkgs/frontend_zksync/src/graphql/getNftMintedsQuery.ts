import {gql} from "urql";

// subgraph query
const getNftMintedsQuery = gql`
  query MyQuery($gameId: Int!) {
    nftMinteds(
      orderDirection: desc
      orderBy: blockTimestamp
      where: {gameId: $gameId}
    ) {
      gameId
      player
      nftAddress
    }
  }
`;

export default getNftMintedsQuery;
