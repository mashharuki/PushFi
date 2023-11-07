# WakuWakuOnchainGame

WakuWakuOnchainGame 用のリポジトリです。

## Live demo

[https://wakuwakuonchaingame.netlify.app/](https://wakuwakuonchaingame.netlify.app/)

## 動かし方

- インストール

  ```bash
  yarn
  ```

- フロントの起動

  ```bash
  yarn frontend:dev
  ```

- メタデータ類のアップロード

  ```bash
  yarn upload
  ```

- スマートコントラクトのコンパイル

  ```bash
  yarn backend:compile
  ```

- スマートコントラクトのデプロイ

  ```bash
  backend:deploy:fuji
  ```

- スマートコントラクトの検証

  ```bash
  yarn backend:verify:fuji
  ```

- スマートコントラクトのテスト

  ```bash
  yarn backend:test
  ```

  実行例

  ```bash
    WakuWakuGame
      init
        ✔ initial owner
        ✔ initial balance
      Game
        ✔ create new game test
        ✔ play game test
        ✔ 【error】play game test
      Withdraw ERC20 Token
        ✔ Withdraw ERC20 Token test

  ·--------------------------------------|---------------------------|-------------|-----------------------------·
  |         Solc version: 0.8.20         ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 30000000 gas  │
  ·······································|···························|·············|······························
  |  Methods                             ·               20 gwei/gas               ·      281965.90 jpy/eth      │
  ·················|·····················|·············|·············|·············|···············|··············
  |  Contract      ·  Method             ·  Min        ·  Max        ·  Avg        ·  # calls      ·  jpy (avg)  │
  ·················|·····················|·············|·············|·············|···············|··············
  |  USDCToken     ·  faucet             ·          -  ·          -  ·      51295  ·            1  ·     289.27  │
  ·················|·····················|·············|·············|·············|···············|··············
  |  WakuWakuGame  ·  createGame         ·          -  ·          -  ·     169644  ·            4  ·     956.68  │
  ·················|·····················|·············|·············|·············|···············|··············
  |  WakuWakuGame  ·  playGame           ·      45828  ·     223694  ·      72751  ·           30  ·     410.27  │
  ·················|·····················|·············|·············|·············|···············|··············
  |  WakuWakuGame  ·  withdrawToken      ·          -  ·          -  ·      60157  ·            1  ·     339.24  │
  ·················|·····················|·············|·············|·············|···············|··············
  |  WakuWakuNFT   ·  transferOwnership  ·          -  ·          -  ·      28656  ·            1  ·     161.60  │
  ·················|·····················|·············|·············|·············|···············|··············
  |  Deployments                         ·                                         ·  % of limit   ·             │
  ·······································|·············|·············|·············|···············|··············
  |  USDCToken                           ·          -  ·          -  ·     574326  ·        1.9 %  ·    3238.81  │
  ·······································|·············|·············|·············|···············|··············
  |  WakuWakuGame                        ·          -  ·          -  ·    1391513  ·        4.6 %  ·    7847.18  │
  ·······································|·············|·············|·············|···············|··············
  |  WakuWakuNFT                         ·          -  ·          -  ·    1598797  ·        5.3 %  ·    9016.12  │
  ·--------------------------------------|-------------|-------------|-------------|---------------|-------------·

    6 passing (993ms)

  ✨  Done in 2.50s.
  ```

## メタデータ関連

1. NFT 用のメタデータ(サンプル)

- [gif](https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/img/nftImg.gif)
- [json](https://bafybeihd5jasbp6spqqapd6jzy7zfosiukwqbx4capmhayjt3yxagudwma.ipfs.dweb.link/json/metadata)

2. 広告用の画像データ(サンプル)

- [sampleGif.gif](https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif)

## アプリのスクリーンショット

![](./pkgs/docs/img/mock.png)
![](./pkgs/docs/img/mock2.png)
![](./pkgs/docs/img/mock3.png)
![](./pkgs/docs/img/mock4.png)
![](./pkgs/docs/img/mock5.png)
![](./pkgs/docs/img/mock6.png)
![](./pkgs/docs/img/mock7.png)
![](./pkgs/docs/img/mock8.png)
![](./pkgs/docs/img/mock9.png)
![](./pkgs/docs/img/mock10.png)
![](./pkgs/docs/img/mock11.png)
![](./pkgs/docs/img/mock12.png)
![](./pkgs/docs/img/mock13.png)
![](./pkgs/docs/img/mock14.png)