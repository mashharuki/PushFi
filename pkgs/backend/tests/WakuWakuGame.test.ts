import { ethers } from "hardhat";
import { WakuWakuGame, WakuWakuGame__factory, WakuWakuNFT__factory } from "../typechain-types";

describe("WakuWakuGame", function () {
  // test variavals
  const gameName = "SampleGame";
  const goalCount = 10;
  const prizeValue = 100;

  /**
   * WakuWakuGame, NFT, Mock ERC20 token deploy function
   * @returns
   */
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();
    // deploy Mock ERC20 token & send faucet tokens
    const amountForOther = ethers.utils.parseEther("5000");
    const USDCToken = await ethers.getContractFactory("USDCToken");
    const usdc = await USDCToken.deploy();
    // deploy NFT contract
    const WakuWakuNFT: WakuWakuNFT__factory = await ethers.getContractFactory("WakuWakuNFT");
    const nft = await WakuWakuNFT.deploy(await owner.getAddress());
    // deploy game contract
    const WakuWakuGame: WakuWakuGame__factory = await ethers.getContractFactory("WakuWakuGame");
    const game = await WakuWakuGame.deploy(await owner.getAddress());

    return {
      owner,
      otherAccount,
      usdc,
      nft,
      game
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
    await game.createGame(gameName, goalCount, prizeToken, prizeValue, nftAddress)
  }

  describe("init", function () {
    it("initial owner", async function () {

    });
    it("initial balance", async function () {

    });
  });

  describe("Game", function () {
    it("create new game test", async function () {

    });
    it("play game test", async function () {

    });
    it("send prize & mint nfts test", async function () {

    });
  });
});