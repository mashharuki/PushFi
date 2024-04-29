import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";
import {BigNumber} from "ethers";
import {ethers} from "hardhat";
import {
  BattleCardNFT,
  BattleCardNFT__factory,
  MockWakuWakuGameV5,
  MockWakuWakuGameV5__factory,
  WakuWakuNFT,
  WakuWakuNFT__factory,
  WakuWakuSuperNFT,
  WakuWakuSuperNFT__factory,
} from "../../typechain-types";

describe("WakuWakuGameV5 test", function () {
  // test variavals
  const gameName = "SampleGame";
  const cardNftSupply = 100;
  const enemyImgUrl =
    "https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif";
  const enemyImgUrl2 =
    "https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif";
  const enemyLife = 100;
  const initWinner = "0x0000000000000000000000000000000000000000";
  const TEST_ADDRESS = "0x0000000000000000000000000000000000000002";

  /**
   * WakuWakuGameV5
   * WakuWakuNFT
   * WakuWakuSuperNFT
   * BattleCardNFT
   * をデプロイするメソッド
   * @returns
   */
  async function deployContract() {
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

    // deploy NFT contract
    const WakuWakuNFT: WakuWakuNFT__factory = await ethers.getContractFactory(
      "WakuWakuNFT"
    );
    const nft: WakuWakuNFT = await WakuWakuNFT.deploy(await owner.getAddress());
    // deploy Super NFT contract
    const WakuWakuSuperNFT: WakuWakuSuperNFT__factory =
      await ethers.getContractFactory("WakuWakuSuperNFT");
    const superNft: WakuWakuSuperNFT = await WakuWakuSuperNFT.deploy(
      await owner.getAddress()
    );
    // deploy BattleCard NFT contract
    const BattleCardNFT: BattleCardNFT__factory =
      await ethers.getContractFactory("BattleCardNFT");
    const battleCardNFT: BattleCardNFT = await BattleCardNFT.deploy(
      await owner.getAddress()
    );
    // deploy game contract
    const WakuWakuGameV5: MockWakuWakuGameV5__factory =
      await ethers.getContractFactory("MockWakuWakuGameV5");
    const game: MockWakuWakuGameV5 = await WakuWakuGameV5.deploy(
      await owner.getAddress()
    );
    // transferownership to game contract
    await nft.transferOwnership(game.address);
    await superNft.transferOwnership(game.address);
    await battleCardNFT.transferOwnership(game.address);

    return {
      owner,
      otherAccount,
      otherAccount2,
      nft,
      superNft,
      battleCardNFT,
      game,
    };
  }

  /**
   * create NewGame method
   */
  const createNewGame = async (
    game: MockWakuWakuGameV5,
    normalNftAddress: string,
    superNftAddress: string,
    battleNftAddress: string
  ) => {
    // create new game
    await game.createGame(
      gameName,
      normalNftAddress,
      superNftAddress,
      battleNftAddress,
      cardNftSupply,
      enemyImgUrl,
      enemyLife
    );
  };

  /**
   * playGame method
   */
  const playGame = async (
    game: MockWakuWakuGameV5,
    player: SignerWithAddress,
    count: number
  ) => {
    await game.connect(player).playGame(player.address, count);
  };

  describe("init", function () {
    it("initial owner", async function () {
      // deploy contract
      const {owner, nft, superNft, battleCardNFT, game} = await loadFixture(
        deployContract
      );

      // get game owner
      const currentOwner = await game.owner();
      expect(await owner.getAddress()).to.eql(currentOwner);

      // get NFT's owner
      const normalNftOwner = await nft.owner();
      const superNftOwner = await superNft.owner();
      const battleNftOwner = await battleCardNFT.owner();
      // check
      expect(game.address).to.eql(normalNftOwner);
      expect(game.address).to.eql(superNftOwner);
      expect(game.address).to.eql(battleNftOwner);
    });
  });

  describe("createNewGame", function () {
    it("create new game", async function () {
      const {nft, superNft, battleCardNFT, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(gameName).to.eql(gameInfo.gameName);
      expect(BigNumber.from("1")).to.eql(gameInfo.gameSeacon);
      expect(true).to.eql(gameInfo.openingStatus);
      expect(nft.address).to.eql(gameInfo.normalNftAddress);
      expect(superNft.address).to.eql(gameInfo.superNftAddress);
      expect(battleCardNFT.address).to.eql(gameInfo.cardNftAddress);
      expect(BigNumber.from(cardNftSupply)).to.eql(gameInfo.cardNftSupply);
      expect(BigNumber.from("0")).to.eql(gameInfo.currentSupply);
      expect(initWinner).to.eql(gameInfo.winner);
      expect(enemyImgUrl).to.eql(gameInfo.enemyInfo.enemyImgUrl);
      expect(BigNumber.from(enemyLife)).to.eql(gameInfo.enemyInfo.enemyLife);
      expect(BigNumber.from("0")).to.eql(activeId);
    });
  });

  describe("change game status", function () {
    it("change game status", async function () {
      const {nft, superNft, battleCardNFT, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(true).to.eql(gameInfo.openingStatus);

      // change game status
      await game.pauseGame(activeId);
      // get status
      const gameStatus = await game.getOpeningStatus(activeId);
      // get game info
      const gameInfo2 = await game.games(activeId);
      // check
      expect(false).to.eql(gameStatus);
      expect(false).to.eql(gameInfo2.openingStatus);
    });

    it("change enemyUrl", async function () {
      const {nft, superNft, battleCardNFT, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // chenge enemyUrl
      await game.changeEnemyUrl(activeId, enemyImgUrl2);
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(enemyImgUrl2).to.eql(gameInfo.enemyInfo.enemyImgUrl);
    });

    it("change normal NFT", async function () {
      const {nft, superNft, battleCardNFT, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // change NFT address
      await game.changeNormalNft(activeId, TEST_ADDRESS);
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(TEST_ADDRESS).to.eql(gameInfo.normalNftAddress);
    });

    it("change super NFT", async function () {
      const {nft, superNft, battleCardNFT, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // change NFT address
      await game.changeSuperNft(activeId, TEST_ADDRESS);
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(TEST_ADDRESS).to.eql(gameInfo.superNftAddress);
    });
  });

  describe("playGame", function () {
    it("【Seazon1】play game", async function () {
      const {owner, nft, superNft, battleCardNFT, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // play game (101 pushCount)
      await playGame(game, owner, 101);
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // get battleCardNFT balance
      const balance1 = await battleCardNFT.balanceOf(owner.address, activeId);

      // check
      expect(BigNumber.from("101")).to.eql(gameInfo.currentSupply);
      expect(BigNumber.from("2")).to.eql(gameInfo.gameSeacon);
      expect(BigNumber.from("101")).to.eql(balance1);
    });

    it("play game by multi players", async function () {
      const {owner, otherAccount, nft, superNft, battleCardNFT, game} =
        await loadFixture(deployContract);
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // play game (101 pushCount)
      await playGame(game, owner, 51);
      await playGame(game, otherAccount, 50);
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // get battleCardNFT balance
      const balance1 = await battleCardNFT.balanceOf(owner.address, activeId);
      const balance2 = await battleCardNFT.balanceOf(
        otherAccount.address,
        activeId
      );

      // check
      expect(BigNumber.from("101")).to.eql(gameInfo.currentSupply);
      expect(BigNumber.from("2")).to.eql(gameInfo.gameSeacon);
      expect(BigNumber.from("51")).to.eql(balance1);
      expect(BigNumber.from("50")).to.eql(balance2);
    });

    it("【Seazon1】emit event test", async function () {
      const {owner, nft, superNft, battleCardNFT, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // play game (101 pushCount)
      await expect(game.connect(owner).playGame(owner.address, 101))
        .to.emit(game, "GameSeasonChanged")
        .withArgs(activeId, 2)
        .to.emit(game, "CurrentSupplyUpdated")
        .withArgs(activeId, battleCardNFT.address, 101);
    });

    it("【Seazon2】play game - simple attack(win)", async function () {
      const {owner, otherAccount, nft, superNft, battleCardNFT, game} =
        await loadFixture(deployContract);
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // play game (101 pushCount)
      await playGame(game, owner, 101);
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(BigNumber.from("2")).to.eql(gameInfo.gameSeacon);

      // NFTをgameコントラクトに預ける。
      await battleCardNFT.safeTransferFrom(
        owner.address,
        game.address,
        activeId,
        40,
        "0x"
      );
      // play game (40 pushCount - win)
      await playGame(game, owner, 40);

      // get partipants info
      const partipantsInfo = await game.partipants(activeId, owner.address);
      // check
      expect(BigNumber.from("40")).to.eql(partipantsInfo);
    });

    it("【Seazon2】play game - simple attack(win) - emit event", async function () {
      const {owner, otherAccount, nft, superNft, battleCardNFT, game} =
        await loadFixture(deployContract);
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // play game (101 pushCount)
      await playGame(game, owner, 101);
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(BigNumber.from("2")).to.eql(gameInfo.gameSeacon);

      // NFTをgameコントラクトに預ける。
      await battleCardNFT.safeTransferFrom(
        owner.address,
        game.address,
        activeId,
        40,
        "0x"
      );
      // play game (40 pushCount - win)
      await expect(game.connect(owner).playGame(owner.address, 40))
        .to.emit(game, "Attack")
        .withArgs(activeId, owner.address, "win", 30, 40)
        .to.emit(game, "EnemyLifeUpdated")
        .withArgs(activeId, 60);

      // get partipants info
      const partipantsInfo = await game.partipants(activeId, owner.address);
      // check
      expect(BigNumber.from("40")).to.eql(partipantsInfo);
    });

    it("【Seazon2】play game - simple attack(lose)", async function () {
      const {owner, otherAccount, nft, superNft, battleCardNFT, game} =
        await loadFixture(deployContract);
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // play game (101 pushCount)
      await playGame(game, owner, 101);
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(BigNumber.from("2")).to.eql(gameInfo.gameSeacon);

      // NFTをgameコントラクトに預ける。
      await battleCardNFT.safeTransferFrom(
        owner.address,
        game.address,
        activeId,
        20,
        "0x"
      );
      // play game (40 pushCount - lose)
      await playGame(game, owner, 20);

      // get partipants info
      const partipantsInfo = await game.partipants(activeId, owner.address);
      // check
      expect(BigNumber.from("0")).to.eql(partipantsInfo);
    });

    it("【Seazon2】play game - simple attack(lose) - emit event", async function () {
      const {owner, otherAccount, nft, superNft, battleCardNFT, game} =
        await loadFixture(deployContract);
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );
      // play game (101 pushCount)
      await playGame(game, owner, 101);
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(BigNumber.from("2")).to.eql(gameInfo.gameSeacon);

      // NFTをgameコントラクトに預ける。
      await battleCardNFT.safeTransferFrom(
        owner.address,
        game.address,
        activeId,
        20,
        "0x"
      );
      // play game (40 pushCount - lose)
      await expect(game.connect(owner).playGame(owner.address, 20))
        .to.emit(game, "Attack")
        .withArgs(activeId, owner.address, "lose", 30, 20);

      // get partipants info
      const partipantsInfo = await game.partipants(activeId, owner.address);
      // check
      expect(BigNumber.from("0")).to.eql(partipantsInfo);
    });

    it("【Seazon2】play game - GameFinish", async function () {
      const {owner, otherAccount, nft, superNft, battleCardNFT, game} =
        await loadFixture(deployContract);
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );

      // play game (50 pushCount)
      await playGame(game, owner, 50);
      // play game (51 pushCount)
      await playGame(game, otherAccount, 51);
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(BigNumber.from("2")).to.eql(gameInfo.gameSeacon);

      // NFTをgameコントラクトに預ける。
      await battleCardNFT.safeTransferFrom(
        owner.address,
        game.address,
        activeId,
        50,
        "0x"
      );

      // play game (50 attack from owner)
      await playGame(game, owner, 50);

      // NFTをgameコントラクトに預ける。
      await battleCardNFT
        .connect(otherAccount)
        .safeTransferFrom(
          otherAccount.address,
          game.address,
          activeId,
          51,
          "0x"
        );

      // play game (50 attack from otherAccount)
      await playGame(game, otherAccount, 51);

      // get partipants info
      const partipantsInfo = await game.partipants(activeId, owner.address);
      const partipantsInfo2 = await game.partipants(
        activeId,
        otherAccount.address
      );
      // check
      expect(BigNumber.from("50")).to.eql(partipantsInfo);
      expect(BigNumber.from("51")).to.eql(partipantsInfo2);

      // get superNFT
      const balanceOf = await superNft.balanceOf(
        otherAccount.address,
        activeId
      );
      // check
      expect(BigNumber.from("1")).to.eql(balanceOf);
    });

    it("【Seazon2】play game - GameFinish - emit Event", async function () {
      const {owner, otherAccount, nft, superNft, battleCardNFT, game} =
        await loadFixture(deployContract);
      // create new game
      await createNewGame(
        game,
        nft.address,
        superNft.address,
        battleCardNFT.address
      );

      // play game (50 pushCount)
      await playGame(game, owner, 50);
      // play game (51 pushCount)
      await playGame(game, otherAccount, 51);
      // get active Game ID
      const activeId = await game.getActiveGameId();
      // get game info
      const gameInfo = await game.games(activeId);
      // check
      expect(BigNumber.from("2")).to.eql(gameInfo.gameSeacon);

      // NFTをgameコントラクトに預ける。
      await battleCardNFT.safeTransferFrom(
        owner.address,
        game.address,
        activeId,
        50,
        "0x"
      );

      // play game (50 attack from owner)
      await playGame(game, owner, 50);

      // NFTをgameコントラクトに預ける。
      await battleCardNFT
        .connect(otherAccount)
        .safeTransferFrom(
          otherAccount.address,
          game.address,
          activeId,
          51,
          "0x"
        );

      // play game (50 attack from otherAccount)
      // check emit event
      await expect(
        game.connect(otherAccount).playGame(otherAccount.address, 51)
      )
        .to.emit(game, "Attack")
        .withArgs(activeId, otherAccount.address, "win", 30, 51)
        .to.emit(game, "GameFinished")
        .withArgs(activeId, otherAccount.address)
        .to.emit(game, "EnemyLifeUpdated")
        .withArgs(activeId, 0);

      // get partipants info
      const partipantsInfo = await game.partipants(activeId, owner.address);
      const partipantsInfo2 = await game.partipants(
        activeId,
        otherAccount.address
      );
      // check
      expect(BigNumber.from("50")).to.eql(partipantsInfo);
      expect(BigNumber.from("51")).to.eql(partipantsInfo2);

      // get superNFT
      const balanceOf = await superNft.balanceOf(
        otherAccount.address,
        activeId
      );
      // check
      expect(BigNumber.from("1")).to.eql(balanceOf);
    });
  });
});
