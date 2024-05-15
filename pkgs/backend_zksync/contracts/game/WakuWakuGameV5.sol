// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "./../utils/Counters.sol";
import "./../nft/WakuWakuNFT.sol";
import "./../nft/WakuWakuSuperNFT.sol";
import "./../nft/BattleCardNFT.sol";

/**
 * WakuWakuGameV5 Contract
 */
contract WakuWakuGameV5 is Ownable, ReentrancyGuard, IERC1155Receiver {
  using Counters for Counters.Counter;
  Counters.Counter public activeGameIdCounter;

  // 大ボスの情報を格納する構造体
  struct EnemyInfo {
    string enemyImgUrl;
    uint256 enemyLife;
  }

  // GameInfo Struct
  struct GameInfo {
    string gameName;
    uint256 gameSeacon;
    bool openingStatus;
    address normalNftAddress;
    address superNftAddress;
    address cardNftAddress;
    uint256 cardNftSupply;
    uint256 currentSupply;
    address winner;
    EnemyInfo enemyInfo;
  }

  // ボスの攻撃力
  uint256[] private bossAttacks = [30, 40, 50, 60, 70, 80, 90, 100];
  // 最も貢献したプレイヤーのアドレスとcount数を保持しておくための変数
  address public maxAddress;
  uint256 public maxCount;

  // mapping
  mapping(uint256 => GameInfo) public games;
  mapping(uint256 => mapping(address => uint256)) public partipants;

  // Event
  event GameCreated(
    uint256 gameId,
    string gameName,
    uint256 gameSeacon,
    bool openingStatus,
    address normalNftAddress,
    address superNftAddress,
    address cardNftAddress,
    uint256 cardNftSupply,
    uint256 currentSupply,
    address winner,
    EnemyInfo enemyInfo
  );
  event GameSeasonChanged(uint256 gameId, uint256 season);
  event Attack(
    uint256 gameId,
    address player,
    string result,
    uint256 attack,
    uint256 pushCount
  );
  event GameFinished(uint256 gameId, address winner);
  event NftMinted(uint256 gameId, address nftAddress, address player);
  event Withdraw(address indexed payee, uint256 weiAmount);
  event WithdrawToken(
    address indexed payee,
    address prizeToken,
    uint256 weiAmount
  );
  event Deposited(address indexed payee, uint256 weiAmount);
  event ChangeEnemyImgUrl(string oldEnemyUrl, string newEnemyUrl);
  event ChangeNormalNftAddress(
    address oldNormalNftAddress,
    address newNormalNftAddress
  );
  event ChangeSuperNftAddress(
    address oldSuperNftAddress,
    address newSuperNftAddress
  );
  event CurrentSupplyUpdated(
    uint256 gameId,
    address cardNftAddress,
    uint256 newSupply
  );
  event EnemyLifeUpdated(uint256 gameId, uint256 newEnemyLife);

  modifier onlyGameOpening(uint256 gameId) {
    require(games[gameId].openingStatus, "Game is not open yet");
    _;
  }

  /**
   * Constructor
   */
  constructor(address initialOwner) Ownable(initialOwner) {}

  /**
   * CreateGame method
   */
  function createGame(
    string memory _gameName,
    address _normalNftAddress,
    address _superNftAddress,
    address _cardNftAddress,
    uint256 _cardNftSupply,
    string memory _enemyImgUrl,
    uint256 _enemyLife
  ) public onlyOwner {
    // get current gameId
    uint256 currentGameId = activeGameIdCounter.current();

    // ボスキャラの情報を作成する。
    EnemyInfo memory enemyInfo = EnemyInfo(_enemyImgUrl, _enemyLife);

    // create New WakuWakuGame
    GameInfo memory newGame = GameInfo(
      _gameName,
      1,
      true,
      _normalNftAddress,
      _superNftAddress,
      _cardNftAddress,
      _cardNftSupply,
      0,
      0x0000000000000000000000000000000000000000,
      enemyInfo
    );

    games[currentGameId] = newGame;

    emit GameCreated(
      currentGameId,
      _gameName,
      1,
      true,
      _normalNftAddress,
      _superNftAddress,
      _cardNftAddress,
      _cardNftSupply,
      0,
      0x0000000000000000000000000000000000000000,
      enemyInfo
    );
  }

  /**
   * playGame method
   * @param _player gameID
   * @param _pushCount plaerAddress
   */
  function playGame(
    address _player,
    uint256 _pushCount
  ) public onlyGameOpening(activeGameIdCounter.current()) {
    // get current active gameId
    uint256 activeGameId = activeGameIdCounter.current();
    // get game info
    GameInfo memory wakuWakuGame = games[activeGameId];
    require(wakuWakuGame.openingStatus, "This game is already finished!!");

    // シーズン情報を取得する
    uint256 currentSeason = wakuWakuGame.gameSeacon;
    // シーズン1とシーズン2でロジックを切り替える
    if (currentSeason == 1) {
      playGameSeazon1(wakuWakuGame, _player, _pushCount, activeGameId);
    } else if (currentSeason == 2) {
      playGameSeazon2(wakuWakuGame, _player, _pushCount, activeGameId);
    }
  }

  /**
   * シーズン1用のPlayGameロジック
   */
  function playGameSeazon1(
    GameInfo memory wakuWakuGame,
    address _player,
    uint256 _pushCount,
    uint256 activeGameId
  ) internal {
    // get current supply
    uint256 currentSupply = wakuWakuGame.currentSupply;
    uint256 newSupply = currentSupply + _pushCount;
    // セット
    wakuWakuGame.currentSupply = newSupply;
    // cardSupply
    uint256 cardNftSupply = wakuWakuGame.cardNftSupply;
    // card nft address
    address cardNftAddress = wakuWakuGame.cardNftAddress;
    // Battle Card NFTをミントする。
    mintNft(cardNftAddress, activeGameId, _player, _pushCount);
    if (newSupply >= cardNftSupply) {
      wakuWakuGame.gameSeacon = 2;
      emit GameSeasonChanged(activeGameId, 2);
    }
    // 新しくGameInfoをセットし直す
    games[activeGameId] = wakuWakuGame;
    emit CurrentSupplyUpdated(activeGameId, cardNftAddress, newSupply);
  }

  /**
   * シーズン2用のPlayGameロジック
   */
  function playGameSeazon2(
    GameInfo memory wakuWakuGame,
    address _player,
    uint256 _pushCount,
    uint256 activeGameId
  ) internal {
    // ボスの攻撃力をランダムで取得する。
    uint256 randomIndex = random(_pushCount);
    uint256 randomAttack = bossAttacks[randomIndex];
    // ボスの攻撃力とpushCountを比較する。
    if (_pushCount >= randomAttack) {
      // ボスにダメージを与えるロジック
      // ボスキャラの体力を取得する。
      uint256 currentEnemyLife = wakuWakuGame.enemyInfo.enemyLife;
      // pushCount分だけ体力を減らす。(0以下になった場合は強制的に0にしてゲームを終了させる。)
      if (_pushCount >= currentEnemyLife) {
        // プレイヤーがこれまで与えたダメージを取得する。
        uint256 currentCount = partipants[activeGameId][_player];
        // プレイヤーが与えたダメージを更新する。
        uint256 newCount = currentCount + _pushCount;
        partipants[activeGameId][_player] = newCount;
        // call check checkMaxCount メソッド
        checkMaxCount(_player, newCount);
        // maxCount を更新する。
        maxCount = 0;
        // Gameのステータスを更新する。
        wakuWakuGame.openingStatus = false;
        // winnerアドレスを設定する。
        wakuWakuGame.winner = maxAddress;
        wakuWakuGame.enemyInfo.enemyLife = 0;
        address superNftAddress = wakuWakuGame.superNftAddress;
        // NFTをミントする。(winner用)
        mintNft(superNftAddress, activeGameId, maxAddress, 1);
        // 新しくGameInfoをセットし直す
        games[activeGameId] = wakuWakuGame;
        // acticeGameIdをインクリメントする。
        activeGameIdCounter.increment();
        // GameFinish イベントを終了させる。
        emit GameFinished(activeGameId, maxAddress);
        emit EnemyLifeUpdated(activeGameId, 0);
      } else {
        // プレイヤーがこれまで与えたダメージを取得する。
        uint256 currentCount = partipants[activeGameId][_player];
        // プレイヤーが与えたダメージを更新する。
        uint256 newCount = currentCount + _pushCount;
        partipants[activeGameId][_player] = newCount;
        // call check checkMaxCount メソッド
        checkMaxCount(_player, newCount);
        // 大ボスのHPを更新する。
        uint256 newEnemyLife = currentEnemyLife - _pushCount;
        wakuWakuGame.enemyInfo.enemyLife = newEnemyLife;
        // 新しくGameInfoをセットし直す
        games[activeGameId] = wakuWakuGame;
        emit EnemyLifeUpdated(activeGameId, newEnemyLife);
      }
      // イベント発火
      emit Attack(activeGameId, _player, "win", randomAttack, _pushCount);
    } else {
      // ボスからダメージを受けるロジック。
      // 預けたNFTは全て没収される。
      emit Attack(activeGameId, _player, "lose", randomAttack, _pushCount);
    }
  }

  /**
   * ゲーム終了後にノーマルNFTとスーパーNFTをミントするメソッド
   * @param _nftAddress NFT Contract Address
   * @param _gameId gameID
   * @param _player palyer's address
   * @param _count push count
   */
  function mintNft(
    address _nftAddress,
    uint256 _gameId,
    address _player,
    uint256 _count
  ) internal {
    // get game info
    GameInfo memory wakuWakuGame = games[_gameId];

    if (wakuWakuGame.normalNftAddress == _nftAddress) {
      // create WakuWakuNFT contract instance
      WakuWakuNFT nft = WakuWakuNFT(_nftAddress);
      // mint
      nft.mint(_player, _gameId, 1, "0x");
      emit NftMinted(_gameId, _nftAddress, _player);
    } else if (wakuWakuGame.superNftAddress == _nftAddress) {
      // create WakuWakuSuperNFT contract instance
      WakuWakuSuperNFT nft = WakuWakuSuperNFT(_nftAddress);
      // mint
      nft.mint(_player, _gameId, 1, "0x");
      emit NftMinted(_gameId, _nftAddress, _player);
    } else if (wakuWakuGame.cardNftAddress == _nftAddress) {
      // create BattleCardNFT contract instance
      BattleCardNFT nft = BattleCardNFT(_nftAddress);
      // get current TotalSupply
      uint256 currentSupply = nft.totalSupply(_gameId);
      // mint
      nft.mint(_player, _gameId, _count, "0x");
      emit NftMinted(_gameId, _nftAddress, _player);
    }
  }

  /**
   * withdraw method
   * @param _to receiverAddress
   */
  function withdraw(address payable _to) public onlyOwner {
    uint256 balance = address(this).balance;
    _to.transfer(balance);
    emit Withdraw(_to, balance);
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
   * change Enemy URL method
   */
  function changeEnemyUrl(
    uint256 _gameId,
    string memory _newEnemyImgUrl
  ) public onlyOwner {
    string memory oldEnemyImgUrl = games[_gameId].enemyInfo.enemyImgUrl;
    games[_gameId].enemyInfo.enemyImgUrl = _newEnemyImgUrl;
    // emit
    emit ChangeEnemyImgUrl(oldEnemyImgUrl, _newEnemyImgUrl);
  }

  /**
   * change Normal NFT address method
   */
  function changeNormalNft(
    uint256 _gameId,
    address _newNormalNftAddress
  ) public onlyOwner {
    address oldNormalNftAddress = games[_gameId].normalNftAddress;
    // change
    games[_gameId].normalNftAddress = _newNormalNftAddress;

    emit ChangeNormalNftAddress(oldNormalNftAddress, _newNormalNftAddress);
  }

  /**
   * change Super NFT address method
   */
  function changeSuperNft(
    uint256 _gameId,
    address _newSuperNftAddress
  ) public onlyOwner {
    address oldSuperNftAddress = games[_gameId].superNftAddress;
    // change
    games[_gameId].superNftAddress = _newSuperNftAddress;

    emit ChangeNormalNftAddress(oldSuperNftAddress, _newSuperNftAddress);
  }

  /**
   * 確率の計算用のランダム関数
   */
  function random(uint256 count) internal view returns (uint256) {
    return
      uint256(
        keccak256(abi.encodePacked(block.prevrandao, count, msg.sender))
      ) % bossAttacks.length;
  }

  /**
   * 新たに更新されたnewCountが最大値かどうかをチェックするメソッド
   */
  function checkMaxCount(address _player, uint256 _count) internal {
    require(_count > 0, "count must be greater than zero");
    // もし最大値以上であれば値を更新する。
    if (_count > maxCount) {
      maxCount = _count;
      maxAddress = _player;
    }
  }

  /**
   * active中のGameIdを取得するメソッド
   */
  function getActiveGameId() public view returns (uint256) {
    return activeGameIdCounter.current();
  }

  /**
   * getActiveGameInfo
   */
  function getActiveGameInfo() public view returns (GameInfo memory) {
    uint256 activeId = activeGameIdCounter.current();
    return games[activeId];
  }

  /**
   * =======================================================================================
   * IERC1155Receiver Contract method
   * =======================================================================================
   */

  function onERC1155Received(
    address operator,
    address from,
    uint256 id,
    uint256 value,
    bytes calldata data
  ) external override returns (bytes4) {
    return this.onERC1155Received.selector;
  }

  function onERC1155BatchReceived(
    address operator,
    address from,
    uint256[] calldata ids,
    uint256[] calldata values,
    bytes calldata data
  ) external override returns (bytes4) {
    return this.onERC1155BatchReceived.selector;
  }

  /**
   * =======================================================================================
   * IERC165 Contract method
   * =======================================================================================
   */

  function supportsInterface(
    bytes4 interfaceId
  ) external view override returns (bool) {
    return true;
  }
}
