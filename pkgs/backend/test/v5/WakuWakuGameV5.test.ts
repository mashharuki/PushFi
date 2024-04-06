import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";
import {BigNumber} from "ethers";
import {ethers} from "hardhat";
import {
  BattleCardNFT,
  BattleCardNFT__factory,
  WakuWakuGameV5,
  WakuWakuGameV5__factory,
  WakuWakuNFT,
  WakuWakuNFT__factory,
  WakuWakuSuperNFT,
  WakuWakuSuperNFT__factory,
} from "../../typechain-types";

describe("WakuWakuGameV5 test", function () {
  // test variavals
  const gameName = "SampleGame";
  const cardNftSupply = 100;
  const sampleAdverUrl =
    "https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif";
  const enemyImgUrl =
    "https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif";
  const enemyLife = 100;
  const initWinner = "0x0000000000000000000000000000000000000000";

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
    const WakuWakuGameV5: WakuWakuGameV5__factory =
      await ethers.getContractFactory("WakuWakuGameV5");
    const game: WakuWakuGameV5 = await WakuWakuGameV5.deploy(
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
    game: WakuWakuGameV5,
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
    game: WakuWakuGameV5,
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

  describe("playGame", function () {
    it("play game", async function () {
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

    it("emit event test", async function () {
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
        .withArgs(activeId, 2);
    });
  });
});
