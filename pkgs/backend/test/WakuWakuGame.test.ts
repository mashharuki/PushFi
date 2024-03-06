import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";
import {BigNumber} from "ethers";
import {ethers} from "hardhat";
import {
  USDCToken,
  USDCToken__factory,
  WakuWakuGame,
  WakuWakuGame__factory,
  WakuWakuNFT,
  WakuWakuNFT__factory,
} from "../typechain-types";

describe("WakuWakuGame", function () {
  // test variavals
  const gameName = "SampleGame";
  const goalCount = 10;
  const prizeValue = 100;
  const amountForOther = "5000";

  /**
   * WakuWakuGame, NFT, Mock ERC20 token deploy function
   * @returns
   */
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();

    // deploy NFT contract
    const WakuWakuNFT: WakuWakuNFT__factory = await ethers.getContractFactory(
      "WakuWakuNFT"
    );
    const nft: WakuWakuNFT = await WakuWakuNFT.deploy(await owner.getAddress());
    // deploy game contract
    const WakuWakuGame: WakuWakuGame__factory = await ethers.getContractFactory(
      "WakuWakuGame"
    );
    const game: WakuWakuGame = await WakuWakuGame.deploy(
      await owner.getAddress()
    );
    // transferownership to game contract
    await nft.transferOwnership(game.address);
    // deploy Mock ERC20 token & send faucet tokens to gameContract
    const USDCToken: USDCToken__factory = await ethers.getContractFactory(
      "USDCToken"
    );
    const usdc: USDCToken = await USDCToken.deploy();
    await usdc.faucet(game.address, amountForOther);

    return {
      owner,
      otherAccount,
      usdc,
      nft,
      game,
    };
  }

  /**
   * create NewGame method
   */
  const createNewGame = async (
    game: WakuWakuGame,
    prizeToken: string,
    nftAddress: string
  ) => {
    // create new game
    await game.createGame(
      gameName,
      goalCount,
      prizeToken,
      prizeValue,
      nftAddress
    );
  };

  /**
   * playGame method
   */
  const playGame = async (
    game: WakuWakuGame,
    player: SignerWithAddress,
    gameId: number,
    count: number
  ) => {
    for (var i = 0; i < count; i++) {
      await game.connect(player).playGame(gameId, player.address);
    }
  };

  describe("init", function () {
    it("initial owner", async function () {
      // deploy contract
      const {owner, game} = await loadFixture(deployContract);

      // get owner
      const currentOwner = await game.owner();
      expect(await owner.getAddress()).to.eql(currentOwner);
    });
    it("initial balance", async function () {
      // deploy contract
      const {usdc, game} = await loadFixture(deployContract);
      // get USDC Token balance
      const balance = await usdc.balanceOf(game.address);
      expect(balance.toString()).to.eql(amountForOther);
    });
  });

  describe("Game", function () {
    it("create new game test", async function () {
      // deploy contract
      const {usdc, nft, game} = await loadFixture(deployContract);
      // create new game
      await createNewGame(game, usdc.address, nft.address);
      // get game info
      const gameInfo = await game.games(0);
      // check initial data
      expect(gameName).to.eql(gameInfo.gameName);
      expect(BigNumber.from("0")).to.eql(gameInfo.currentCount);
      expect(BigNumber.from(goalCount)).to.eql(gameInfo.goalCount);
      expect(true).to.eql(gameInfo.openingStatus);
      expect(usdc.address).to.eql(gameInfo.prizeToken);
      expect(BigNumber.from(prizeValue)).to.eql(gameInfo.prizeValue);
      expect(nft.address).to.eql(gameInfo.nftAddress);
      expect(ethers.constants.AddressZero).to.eql(gameInfo.winner);
    });
    it("play game test", async function () {
      // deploy contract
      const {owner, otherAccount, usdc, nft, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(game, usdc.address, nft.address);
      // play game 5 times
      await playGame(game, owner, 0, 5);
      // play game 5 times from other account
      await playGame(game, otherAccount, 0, 5);

      // get gameInfo
      const gameInfo = await game.games(0);
      // get balanceOf ERC20 Token
      const balance1 = await usdc.balanceOf(game.address);
      const balance2 = await usdc.balanceOf(otherAccount.address);
      // get balanceOf NFT
      const nftBalance1 = await nft.balanceOf(owner.address, 0);
      const nftBalance2 = await nft.balanceOf(otherAccount.address, 0);

      // check game Status & balance of ERC20 token & nft
      expect(false).to.eql(gameInfo.openingStatus);
      expect(otherAccount.address).to.eql(gameInfo.winner);
      expect(balance1.toString()).to.eql("4900");
      expect(balance2.toString()).to.eql("100");
      expect(nftBalance1.toString()).to.eql("1");
      expect(nftBalance2.toString()).to.eql("1");
    });
    it("【error】play game test", async function () {
      // deploy contract
      const {owner, otherAccount, usdc, nft, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(game, usdc.address, nft.address);
      // play game 5 times
      await playGame(game, owner, 0, 5);
      // play game 5 times from other account
      await playGame(game, otherAccount, 0, 5);

      await expect(playGame(game, owner, 0, 1)).to.be.revertedWith(
        "This game is already finished!!"
      );
    });
  });

  describe("Withdraw ERC20 Token", function () {
    it("Withdraw ERC20 Token test", async function () {
      // deploy contract
      const {owner, otherAccount, usdc, nft, game} = await loadFixture(
        deployContract
      );
      // create new game
      await createNewGame(game, usdc.address, nft.address);
      // play game 5 times
      await playGame(game, owner, 0, 5);
      // play game 5 times from other account
      await playGame(game, otherAccount, 0, 5);
      // withdraw token
      await game.withdrawToken(0, owner.address);
      // get balance
      const balance1 = await usdc.balanceOf(game.address);
      const balance2 = await usdc.balanceOf(otherAccount.address);
      const balance3 = await usdc.balanceOf(owner.address);
      // check
      expect(balance1.toString()).to.eql("0");
      expect(balance2.toString()).to.eql("100");
      expect(balance3.toString()).to.eql("10000000000000000004900");
    });
  });
});
