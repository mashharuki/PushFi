// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./../WakuWakuNFT.sol";

/**
 * WakuWakuGameV2 Contract
 */
contract WakuWakuGameV2 is Ownable {

  // WakuWakuGame Struct
  struct WakuWakuGame {
    string gameName;
    uint256 currentCount;
    uint256 goalCount;
    bool openingStatus;
    address prizeToken;
    uint256 prizeValue;
    address nftAddress;
    address winner;
    address[] paticipants;
  }

  // gameID
  uint256 private gameIdCounter = 0;

  // mapping
  mapping(uint256 => WakuWakuGame) public games;

  // Event
  event GameCreated(uint256 gameId, string gameName, uint256 goalCount, address prizeToken, uint256 prizeValue, address nftAddress);
  event GameFinished(uint256 gameId, address winner);
  event PrizeSent(uint256 gameId, address erc20TokenAddress, address receiver, uint256 value);
  event NftMinted(uint256 gameId, address nftAddress, address[] paticipants);
  event Withdrawn(address indexed payee, uint256 weiAmount);
  event WithdrawnToken(address indexed payee, address prizeToken, uint256 weiAmount);
  event Deposited(address indexed payee, uint256 weiAmount);

  /**
   * Constructor
   */
  constructor(address initialOwner) Ownable(initialOwner) {}

  /**
   * CreateGame method
   */
  function createGame(
    string memory _gameName,
    uint256 _goalCount,
    address _prizeToken,
    uint256 _prizeValue,
    address _nftAddress
  ) onlyOwner public {
    // get current gameId
    uint256 currentGameIdCounter = gameIdCounter;
    // initial participants
    address[] memory initParticipants;

    // create New WakuWakuGame
    WakuWakuGame memory newGame = WakuWakuGame(
      _gameName,
      0,
      _goalCount,
      true,
      _prizeToken,
      _prizeValue,
      _nftAddress,
      0x0000000000000000000000000000000000000000,
      initParticipants
    );

    games[currentGameIdCounter] = newGame;
    gameIdCounter++;

    emit GameCreated(currentGameIdCounter, _gameName, _goalCount, _prizeToken, _prizeValue, _nftAddress);
  }

  /**
   * playGame method
   * @param _gameId gameID
   * * @param _player plaerAddress
   */
  function playGame(uint256 _gameId, address _player) public {
    // get game info
    WakuWakuGame memory wakuWakuGame = games[_gameId];
    require(wakuWakuGame.openingStatus, "This game is already finished!!");

    // increment currentCount
    games[_gameId].currentCount += 1;
    uint256 currentCount = games[_gameId].currentCount;

    // insert player address if not yet
    address[] memory participants = wakuWakuGame.paticipants;
    
    bool alreadyInsertedFlg = false;
    // check registered status
    for(uint256 i = 0; i < participants.length; i++) {
      if(participants[i] == _player) {
        alreadyInsertedFlg = true;
      }
    }

    if(!alreadyInsertedFlg) {
      address[] memory newParticipants = new address[](participants.length + 1);
      // insert & set
      for(uint256 i = 0; i < participants.length; i++) {
        newParticipants[i] = participants[i];
      }
      // push
      newParticipants[participants.length] = _player;
      games[_gameId].paticipants = newParticipants;
    }

    // check goalCounter & currentCount
    if(currentCount >= wakuWakuGame.goalCount) {
     
      // send Super NFT
      sendPrize(_gameId);
      mintNfts(_gameId);
    } else {
      // send Super NFT
      sendPrize(_gameId);
      mintNfts(_gameId);
    }
  }

  /**
   * sendPrize method
   * @param _gameId gameID
   */
  function sendPrize(uint256 _gameId) internal {
    // get game info
    WakuWakuGame memory wakuWakuGame = games[_gameId];
    require(!wakuWakuGame.openingStatus, "This game is not already finished!!");

    // create ERC20 contract instance
    IERC20 prizeToken = IERC20(wakuWakuGame.prizeToken);
    // send
    prizeToken.transfer(wakuWakuGame.winner, wakuWakuGame.prizeValue);
    emit PrizeSent(_gameId, wakuWakuGame.prizeToken, wakuWakuGame.winner, wakuWakuGame.prizeValue);
  }

  /**
   * mintNfts method
   * @param _gameId gameID
   */
  function mintNfts(uint256 _gameId) internal {
    // get game info
    WakuWakuGame memory wakuWakuGame = games[_gameId];
    require(!wakuWakuGame.openingStatus, "This game is not already finished!!");

    // create WakuWakuNFT contract instance
    WakuWakuNFT nft = WakuWakuNFT(wakuWakuGame.nftAddress);
    // get participants address
    address[] memory participants = wakuWakuGame.paticipants;
    // mint NFT to all participant
    for(uint256 i = 0; i < participants.length; i++) {
      nft.mint(participants[i], _gameId, 1, '0x');
    }
    emit NftMinted(_gameId, wakuWakuGame.nftAddress, participants);
  }

  /**
   * withdraw method
   * @param _to receiverAddress
   */
  function withdraw(address payable _to) onlyOwner public {
    uint256 balance = address(this).balance;
    _to.transfer(balance);
    emit Withdrawn(_to, balance);
  }

  /**
   * withdrawToken
   */
  function withdrawToken(
    uint256 _gameId, 
    address payable _to
  ) onlyOwner public {
    // get game info
    WakuWakuGame memory wakuWakuGame = games[_gameId];
    // create ERC20 contract instance
    IERC20 prizeToken = IERC20(wakuWakuGame.prizeToken);
    // get balance of this contract
    uint256 balance = prizeToken.balanceOf(address(this));
    prizeToken.transfer(_to, balance);
    emit WithdrawnToken(_to, address(prizeToken), balance);
  }

  // Function to receive Ether. msg.data must be empty
  receive() external payable {
    emit Deposited(msg.sender, msg.value);
  }
  // Fallback function is called when msg.data is not empty
  fallback() external payable {
    emit Deposited(msg.sender, msg.value);
  }

  /**
   * get OpeningStatus method
   * @param _gameId gameID
   */
  function getOpeningStatus(uint256 _gameId) public view returns (bool result) {
    result = games[_gameId].openingStatus;
    return result;
  }
}