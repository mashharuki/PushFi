import {gql} from "urql";

// subgraph query
const getGameQuery = gql`
  query MyQuery {
    gameCreateds(orderBy: gameId, orderDirection: desc, first: 1) {
      gameId
      gameName
      gameSeacon
      normalNftAddress
      openingStatus
      transactionHash
      superNftAddress
      winner
      enemyInfo_enemyLife
      enemyInfo_enemyImgUrl
      currentSupply
      cardNftSupply
      cardNftAddress
    }
  }
`;

export default getGameQuery;
