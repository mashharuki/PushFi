import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import {
  WakuWakuGameV2,
  WakuWakuGameV2__factory,
  WakuWakuNFT,
  WakuWakuNFT__factory,
  WakuWakuSuperNFT,
  WakuWakuSuperNFT__factory
} from "../../typechain-types";


describe("WakuWakuGameV2", function () {
  // test variavals
  const gameName = "SampleGame";
  const goalCount = 10;
  const sampleAdverUrl = "https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif";

  /**
   * WakuWakuGame, NFT, Mock ERC20 token deploy function
   * @returns
   */
  async function deployContract() {
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

    // deploy NFT contract
    const WakuWakuNFT: WakuWakuNFT__factory = await ethers.getContractFactory("WakuWakuNFT");
    const nft: WakuWakuNFT = await WakuWakuNFT.deploy(await owner.getAddress());
    // deploy Super NFT contract
    const WakuWakuSuperNFT: WakuWakuSuperNFT__factory = await ethers.getContractFactory("WakuWakuSuperNFT");
    const superNft: WakuWakuSuperNFT = await WakuWakuNFT.deploy(await owner.getAddress());
    // deploy game contract
    const WakuWakuGameV2: WakuWakuGameV2__factory = await ethers.getContractFactory("WakuWakuGameV2");
    const game: WakuWakuGameV2 = await WakuWakuGameV2.deploy(await owner.getAddress());
    // transferownership to game contract
    await nft.transferOwnership(game.address);
    await superNft.transferOwnership(game.address);
  
    return {
      owner,
      otherAccount,
      otherAccount2,
      nft,
      superNft,
      game
    };
  }

  /**
   * create NewGame method
   */
  const createNewGame = async (
    game: WakuWakuGameV2,
    superNftAddress: string,
    nftAddress: string
  ) => {
    // create new game
    await game.createGame(gameName, goalCount, superNftAddress, nftAddress, sampleAdverUrl)
  }

  /**
   * playGame method
   */
  const playGame = async (
    game: WakuWakuGameV2,
    player: SignerWithAddress,
    gameId: number,
    count: number
  ) => {
    for(var i = 0; i < count; i++) {
      await game.connect(player).playGame(gameId, player.address)
    }
  }

  describe("init", function () {
    it("initial owner", async function () {
      // deploy contract
      const { owner, game } = await loadFixture(deployContract);

      // get owner
      const currentOwner = await game.owner();
      expect(await owner.getAddress()).to.eql(currentOwner)
    });
  });

  describe("Game", function () {
    it("create new game test", async function () {
      // deploy contract
      const { nft, superNft, game } = await loadFixture(deployContract);
      // create new game
      await createNewGame(game, superNft.address, nft.address);
      // get game info
      const gameInfo = await game.games(0);
      // check initial data
      expect(gameName).to.eql(gameInfo.gameName);
      expect(BigNumber.from("0")).to.eql(gameInfo.currentCount);
      expect(BigNumber.from(goalCount)).to.eql(gameInfo.goalCount);
      expect(true).to.eql(gameInfo.openingStatus);
      expect(superNft.address).to.eql(gameInfo.supserNftAddress);
      expect(nft.address).to.eql(gameInfo.nftAddress);
      expect(ethers.constants.AddressZero).to.eql(gameInfo.winner);
    });
    it("play game test 【 10 times】", async function () {
      // deploy contract
      const { owner, otherAccount, superNft,  nft, game } = await loadFixture(deployContract);
      // create new game
      await createNewGame(game, superNft.address , nft.address);
      // play game 5 times
      await playGame(game, owner, 0, 5);
      // play game 5 times from other account
      await playGame(game, otherAccount, 0, 5);

      // get gameInfo
      const gameInfo = await game.games(0);
      // get balanceOf Super NFT 
      const superNftBalance1 = await superNft.balanceOf(owner.address, 0);
      const superNftBalance2 = await superNft.balanceOf(otherAccount.address, 0);
      // get balanceOf NFT 
      const nftBalance1 = await nft.balanceOf(owner.address, 0);
      const nftBalance2 = await nft.balanceOf(otherAccount.address, 0);

      // check game Status & balance of ERC20 token & nft
      expect(true).to.eql(gameInfo.openingStatus);
      expect(superNftBalance1.toString()).to.eql("0");
      expect(superNftBalance2.toString()).to.eql("1");
      expect(nftBalance1.toString()).to.eql("5");
      expect(nftBalance2.toString()).to.eql("4");
    });
    it("play game test 【 20 times】", async function () {
      // deploy contract
      const { owner, otherAccount, otherAccount2, superNft,  nft, game } = await loadFixture(deployContract);
      // create new game
      await createNewGame(game, superNft.address , nft.address);
      // play game 5 times
      await playGame(game, owner, 0, 5);
      // play game 5 times from other account
      await playGame(game, otherAccount, 0, 5);
      // play game 5 times
      await playGame(game, owner, 0, 5);
      // paly game 4 times
      await playGame(game, otherAccount, 0, 4);
      // paly game 1 time 
      await playGame(game, otherAccount2, 0, 1);

      // get gameInfo
      const gameInfo = await game.games(0);
      // get balanceOf Super NFT 
      const superNftBalance1 = await superNft.balanceOf(owner.address, 0);
      const superNftBalance2 = await superNft.balanceOf(otherAccount.address, 0);
      const superNftBalance3 = await superNft.balanceOf(otherAccount2.address, 0);
      // get balanceOf NFT 
      const nftBalance1 = await nft.balanceOf(owner.address, 0);
      const nftBalance2 = await nft.balanceOf(otherAccount.address, 0);
      const nftBalance3 = await nft.balanceOf(otherAccount2.address, 0);

      // check game Status & balance of nft & Super NFT
      expect(true).to.eql(gameInfo.openingStatus);
      expect(superNftBalance1.toString()).to.eql("0");
      expect(superNftBalance2.toString()).to.eql("1");
      expect(superNftBalance3.toString()).to.eql("1");
      expect(nftBalance1.toString()).to.eql("10");
      expect(nftBalance2.toString()).to.eql("8");
      expect(nftBalance3.toString()).to.eql("0");
    });
  });
});