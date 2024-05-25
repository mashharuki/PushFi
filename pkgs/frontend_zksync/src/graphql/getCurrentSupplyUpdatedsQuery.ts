import {gql} from "urql";

// subgraph query
const getCurrentSupplyUpdatedsQuery = gql`
  query MyQuery($gameId: Int!) {
    currentSupplyUpdateds(
      orderBy: blockTimestamp
      orderDirection: desc
      first: 1
      where: {gameId: $gameId}
    ) {
      gameId
      newSupply
      cardNftAddress
    }
  }
`;

export default getCurrentSupplyUpdatedsQuery;
