//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC404} from "./../../base/ERC404.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/**
 * ERC404を継承したサンプルコントラクト
 */
contract Example is ERC404 {
  constructor(address _owner) ERC404("Example", "EXM", 18, 10_000, _owner) {
    balanceOf[_owner] = totalSupply;
    setWhitelist(_owner, true);
  }

  function tokenURI(uint256 id) public pure override returns (string memory){
    return "https://bafybeihd5jasbp6spqqapd6jzy7zfosiukwqbx4capmhayjt3yxagudwma.ipfs.dweb.link/json/metadata";
  }
}