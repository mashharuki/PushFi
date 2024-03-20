import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {expect} from "chai";
import {BigNumber} from "ethers";
import {ethers} from "hardhat";
import {Example, Example__factory} from "../../typechain-types";

describe("ERC404 Examples", function () {
  // テスト用の値
  const NFT_NAME = "Example";
  const NFT_SYMBOL = "EXM";

  /**
   * ERC404 deploy function
   * @returns
   */
  async function deployContract() {
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

    // deploy NFT contract
    const Example: Example__factory = await ethers.getContractFactory(
      "Example"
    );

    const example: Example = await Example.deploy(await owner.getAddress());

    return {
      example,
      owner,
      otherAccount,
      otherAccount2,
    };
  }

  describe("init", function () {
    it("initial info", async function () {
      // deploy contract
      const {owner, example} = await loadFixture(deployContract);

      console.log("example", example);

      // get owner
      const currentOwner = await example.owner();
      expect(await owner.getAddress()).to.eql(currentOwner);

      // get totalSupply
      const totalSupply = await example.totalSupply();
      expect(parseInt(totalSupply._hex, 16)).to.eql(10000000000000000000000);

      // get decimals
      const decimals = await example.decimals();
      expect(decimals).to.eql(18);

      // get name & symbol
      const name = await example.name();
      const symbol = await example.symbol();

      expect(name).to.eql(NFT_NAME);
      expect(symbol).to.eql(NFT_SYMBOL);

      // get balance
      const balance = await example.balanceOf(owner.address);
      expect(parseInt(balance._hex, 16)).to.eql(10000000000000000000000);

      // get minted counter
      const minted = await example.minted();
      expect(minted).to.eql(BigNumber.from(0));
    });

    it("check initial whitelist", async function () {
      // deploy contract
      const {owner, otherAccount, example} = await loadFixture(deployContract);
      // check whitlist
      expect(await example.whitelist(await owner.getAddress())).to.eql(true);
      expect(await example.whitelist(await otherAccount.getAddress())).to.eql(
        false
      );
    });
  });

  describe("function test", function () {
    it("trasfer test", async function () {
      // deploy contract
      const {owner, otherAccount, example} = await loadFixture(deployContract);
      // transfer 1000 FT
      await example.transfer(otherAccount.address, 1000);
      // get balance
      const balance1 = await example.balanceOf(owner.address);
      const balance2 = await example.balanceOf(otherAccount.address);
      // check
      expect(parseInt(balance1._hex, 16)).to.eql(9999999999999999999000);
      expect(parseInt(balance2._hex, 16)).to.eql(1000);
      // get minted counter
      const minted = await example.minted();
      expect(minted).to.eql(BigNumber.from(0));
    });

    it("trasfer test2", async function () {
      // deploy contract
      const {owner, otherAccount, example} = await loadFixture(deployContract);
      // transfer 1000 FT
      await example.transfer(otherAccount.address, 100000);
      // get balance
      const balance1 = await example.balanceOf(owner.address);
      const balance2 = await example.balanceOf(otherAccount.address);
      // check
      expect(parseInt(balance1._hex, 16)).to.eql(9999999999999999900000);
      expect(parseInt(balance2._hex, 16)).to.eql(100000);
      // get minted counter
      const minted = await example.minted();
      expect(minted).to.eql(BigNumber.from(0));
    });

    it("trasfer & mint NFT test", async function () {
      // deploy contract
      const {owner, otherAccount, example} = await loadFixture(deployContract);
      const amount = BigInt(1 * 10 ** 18);
      // transfer 1000 FT
      await example.transfer(otherAccount.address, amount);
      // get balance
      const balance2 = await example.balanceOf(otherAccount.address);
      // check
      expect(parseInt(balance2._hex, 16).toString()).to.equal(
        amount.toString()
      );
      // check owner of token Id 1
      expect(await example.ownerOf(1)).to.be.equal(otherAccount.address);
      // get minted counter
      const minted = await example.minted();
      expect(minted).to.eql(BigNumber.from(1));
    });

    it("trasfer & mint NFT (otherAccount → otherAccount2) test", async function () {
      // deploy contract
      const {otherAccount, otherAccount2, example} = await loadFixture(
        deployContract
      );
      const amount = BigInt(1 * 10 ** 18);
      // transfer 1000 FT
      await example.transfer(otherAccount.address, amount);
      // get balance
      const balance = await example.balanceOf(otherAccount.address);
      // check
      expect(parseInt(balance._hex, 16).toString()).to.equal(amount.toString());

      // transfer from otherAcccount to otherAccount2
      // & burn NFT (ID 1) , mint NFT (ID 2)
      await example
        .connect(otherAccount)
        .transfer(otherAccount2.address, amount);
      // check balance of FT
      const balance2 = await example.balanceOf(otherAccount.address);
      const balance3 = await example.balanceOf(otherAccount2.address);
      // check
      expect(parseInt(balance2._hex, 16).toString()).to.equal((0).toString());
      expect(parseInt(balance3._hex, 16).toString()).to.equal(
        amount.toString()
      );
      // check owner of token Id 2
      expect(await example.ownerOf(2)).to.be.equal(otherAccount2.address);
      // get minted counter
      const minted = await example.minted();
      expect(minted).to.eql(BigNumber.from(2));
    });
  });
});
