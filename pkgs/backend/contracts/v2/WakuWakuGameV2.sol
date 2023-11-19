// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./../WakuWakuNFT.sol";
import "./../WakuWakuSuperNFT.sol";

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
    address supserNftToken;
    address nftAddress;
    address winner;
    address[] paticipants;
    string adverUrl;
  }

  // gameID
  uint256 private gameIdCounter = 0;
  // Advertizement URL
  string public adverUrl = "";

  // mapping
  mapping(uint256 => WakuWakuGame) public games;

  // Event
  event GameCreated(uint256 gameId, string gameName, uint256 goalCount, address superNftAddress, address nftAddress, string adverUrl);
  event GameFinished(uint256 gameId, address winner);
  event PrizeSent(uint256 gameId, address erc20TokenAddress, address receiver, uint256 value);
  event NftMinted(uint256 gameId, address nftAddress, address player);
  event Withdrawn(address indexed payee, uint256 weiAmount);
  event WithdrawnToken(address indexed payee, address prizeToken, uint256 weiAmount);
  event Deposited(address indexed payee, uint256 weiAmount);
  event ChangeAdverUrl(string oldAdverUrl, string newAdverUrl);

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
    address _superNftAddress,
    address _nftAddress,
    string memory _adverUrl
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
      _superNftAddress,
      _nftAddress,
      0x0000000000000000000000000000000000000000,
      initParticipants,
      _adverUrl
    );

    games[currentGameIdCounter] = newGame;
    gameIdCounter++;

    emit GameCreated(currentGameIdCounter, _gameName, _goalCount, _superNftAddress, _nftAddress, _adverUrl);
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

    // goalCountに設定された倍数回目かをチェックする。
    if(currentCount >= wakuWakuGame.goalCount) {
      // send Super NFT
      mintNft(wakuWakuGame.supserNftToken, _gameId, _player);
    } else {
      // send Normal NFT
      mintNft(wakuWakuGame.nftAddress, _gameId, _player);
    }
  }

  /**
   * mintNfts method
   * @param _nftAddress NFT Contract Address
   * @param _gameId gameID
   * @param _player palyer's address
   */
  function mintNft(
    address _nftAddress,
    uint256 _gameId, 
    address _player
  ) internal {
    // get game info
    WakuWakuGame memory wakuWakuGame = games[_gameId];
    require(!wakuWakuGame.openingStatus, "This game is not already finished!!");

    if(wakuWakuGame.nftAddress == _nftAddress) {
      // create WakuWakuNFT contract instance
      WakuWakuNFT nft = WakuWakuNFT(wakuWakuGame.nftAddress);
      // mint 
      nft.mint(_player, _gameId, 1, '0x');
    } else {
      // create WakuWakuSuperNFT contract instance
      WakuWakuSuperNFT nft = WakuWakuSuperNFT(wakuWakuGame.nftAddress);
      // mint 
      nft.mint(_player, _gameId, 1, '0x');
    }

    emit NftMinted(_gameId, wakuWakuGame.nftAddress, _player);
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

  /**
   * Pause Game
   */
  function pauseGame(uint256 _gameId) public onlyOwner {
    games[_gameId].openingStatus = false;
  }

  /**
   * change Adver URL method
   */
  function changeAdverUrl(uint256 _gameId, string memory _newAdverUrl) public onlyOwner {
    string memory oldAdverUrl = games[_gameId].adverUrl;
    games[_gameId].adverUrl = _newAdverUrl;
    // emit
    emit ChangeAdverUrl(oldAdverUrl, _newAdverUrl);
  }

  /**
   * goalCountに設定された倍数回目かをチェックするメソッド
   */
  function isMultipleOfGoalCount(
    uint256 _currentCount,
    uint256 _goalCount
  ) external pure returns (bool) {
    return (_currentCount % _goalCount == 0);
  }
}