# Push Fi

<strong>トランザクションの嵐を巻き起こせ!!</strong>

## Live demo

[https://pushfi.netlify.app/](https://pushfi.netlify.app/)

## サイトへの QR コード

<div align="center">
  <img width="200px" src="./pkgs/docs/img/QR_code.png" /> 
</div>

## What it does

Push Fi は世界一のトランザクションを巻き起こすアプリケーションです。

ユーザーは使い始めるのにパスワードの設定などは不要です。Web3Auth と BiconomySDK によりユーザーフレンドリーな UX を実現させています。

ユーザーがやることはボタンを押すだけ！！

ゲームが始まると 15 秒間の時間が設けられるので、その間ひたすらボタンを連打します。この時連打した回数だけスーパー NFT をミントできるチャンスが増えます！！

一気に 100 人でゲームを実施したらそれだけで 1 万近くのトランザクションを発火できる可能性があります！！

トランザクションを発火させる間にできる待ち時間にはユーザーに広告を見てもらうことでスキマ時間もうまく活用できるようになっています！

## The Value of this product

Web3Auth ✖️ AA ✖️ シンプルな UI により、超手軽に遊べるブロックチェーンゲームとなっています！！

また、連打するという今までブロックチェーンシステムにあまり取り入れられてこなかったような要素も取り入れてユーザーが楽しめるようにしました。

ゲームをプレイするまでのステップも簡単なのでこれまでブロックチェーンに馴染みが無かった人も巻き込んでトランザクションの嵐を巻き起こすことができます！！

Web3 をもっと面白く盛り上げていく可能性がこの PushFi の最大の魅力になります！！  
EVM のブロックチェーンかつ Biconomy 対応のブロックチェーンであればいずれのブロックチェーンでも動かすことができます！！

## Technologies I used

Next.js  
hardhat  
TypeScript  
Account Abstraction  
openzeppelin  
yarn workspaces  
Web3Auth  
BiconomySDK  
Web3Storage

## How we built it

ryuta

調査・プレゼン・資料を担当

mashharuki

調査・開発を担当

## What we learned

Web3Auth と BiconomySDK を組み合わせた AA アプリケーションの開発手法を学びました。また、バッチトランザクションを応用してユーザーに連打させただけトランザクションを発火させるという方法を思いつき実装することができました。

また、ゲームと広告という AA と比較的相性が良いとされる 3 つのカテゴリを組み合わせたプロダクトを形にする方法を学びました。

## What's next for

UX の改善、スーパー NFT の具体的なユースケースの模索

現時点で考えているアイディア  
スーパー NFT を 10 枚集めるとクーポンやポップコーンに交換できるといった現実世界のものとのトレードへの活用

スーパー NFT を NFT プロジェクトプレミント用の AL NFT にして他の Web3 プロジェクトとコラボするなど

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

- モック用の VRF コントラクトを使って乱数を生成する

  ```bash
  yarn workspace backend scripts:mock:getRandamNumber:fuji
  ```

  実行例

  ```bash
  ======================= start =========================
  randamNumber: 10602206972064053867483789272536493107592815164562923766237165007315967766038
  ======================== end  ========================
  ✨  Done in 1.43s.
  ✨  Done in 1.57s.
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

2. Super NFT 用のメタデータ

- [git](https://bafkreigk4b5bdrl6i7aleiolfhngc3b5cgl3altssjzqt3qoc2b26ibzcm.ipfs.w3s.link/)
- [json](https://bafkreib4c2d7kp4xspm42cxw32m4ilvbzuj4prbimwejkvjammpqo2mqym.ipfs.w3s.link/)

3. 広告用の画像データ

- [sampleGif.gif](https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif)
- [sampleImg2](https://bafkreihnwh275aqcc6sjo2f37yaphhh2rp44tsmdrsv25k72iiozybzluy.ipfs.w3s.link/)
- [sampleBAYC](https://bafkreie4o7bbfitr4vmuckphvmf7n3aettzb57necosjf3oo5e5syhcfgq.ipfs.w3s.link/)

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
![](./pkgs/docs/img/mock15.png)
![](./pkgs/docs/img/mock16.png)
![](./pkgs/docs/img/mock17.png)
![](./pkgs/docs/img/mock18.png)
![](./pkgs/docs/img/mock19.png)

### 参考文献

1. [Chainlink Verifiable Randomness Function](https://vrf.chain.link/)
2. [Chainlink Verifiable Randomness Function - Avalanche Fuji testnet](https://docs.chain.link/vrf/v2/subscription/supported-networks#avalanche-fuji-testnet)
3. [Remix - VRFv2DirectFundingConsumer.sol](https://remix.ethereum.org/#url=https://docs.chain.link/samples/VRF/VRFv2DirectFundingConsumer.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.24+commit.e11b9ed9.js)
4. [Sample Randamness Contract](https://vrf.chain.link/fuji/1434)
5. [Sample Randamness Contract - Snowtrace](https://testnet.snowtrace.io/address/0x2A2f5591FaF06EAC30Cf46A78D16Cce2d97B4dD7)
