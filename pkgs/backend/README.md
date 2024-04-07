# WakuWakuGame Project

## セットアップ手順(Chainlink 側)

1. まず VRF 用のコントラクトをデプロイ する。

```bash
yarn backend deploy:mock:sampleVRF:fuji
```

2. [https://vrf.chain.link/](https://vrf.chain.link/)に移動してデプロイしたコントラクトを登録する。

3. [https://automation.chain.link/](https://automation.chain.link/)に移動して Automation を登録する。

4. 最後にテスト用のスクリプトを実行して乱数が取得できるかチェックする。

```bash
yarn backend scripts:mock:getRandamNumber:fuji
```

```bash
======================= start =========================
randamNumber: 108137989208009555331517045519597547955163063415551176323732286775327001444949
 ======================== end  ========================
✨  Done in 1.74s.
```

## セットアップ手順(Game コントラクト)

1. まず NFT をデプロイ する。

```bash
yarn backend deploy:nft:fuji
```

2. GameNFT をデプロイする。

```bash
yarn backend deploy:game:fuji
```

3. Game を作成する。

```bash
yarn backend scripts:create-game:fuji
```

4. Game コントラクトと GameID の情報をフロントエンド側に設定する。

`pkgs/frontend/utils/constants.ts`ファイルを更新する。

## デプロイ済みコントラクトの情報(Aalanche Fuji)

- NFT

  - Snowtrace

    [0x7518C6Ca099673C41890f0f2dAd7a6797e201bA4](https://testnet.snowtrace.io/address/0x7518C6Ca099673C41890f0f2dAd7a6797e201bA4#code)

  - OpenSea

    [OpenSea WakuWakuNFT](https://testnets.opensea.io/ja/collection/unidentified-contract-171f6fd4-82fe-4e3f-95a6-8d1c)

- SuperNFT

  - Snowtrace

    [0x96cf27b3EfA3DbE9890b0a299A072F7Ff8adf0Ab](https://testnet.snowtrace.io/address/0x96cf27b3EfA3DbE9890b0a299A072F7Ff8adf0Ab#code)

  - Opensea

    [OpenSea WakuWakuSuperNFT](https://testnets.opensea.io/ja/collection/unidentified-contract-2052654a-b87d-4913-ba70-fae6)

- Game Contract(V1)

  [WakuWakuGame](https://testnet.snowtrace.io/address/0x985e632298882212d91AB2C9c0d00D80b82880b7#code)

- Game Contract(v2)

  [WakuWakuGameV2](https://testnet.snowtrace.io/address/0xF0611189992Fb2d5487BdBFCb076194fE372c992#code)

- Game Contract(v3)
  [WakuWakuGameV3](https://testnet.snowtrace.io/address/0x587E68B8b22d803Ac0aAF568e87c6fE12DA103E7#code)

## デプロイ済みのコントラクトの情報(Arbitrum Sepolia)

- NFT

  [0x08FeD32A2043DbCFbb1CE9d9b62416B9095CaD13](https://sepolia.arbiscan.io/address/0x08FeD32A2043DbCFbb1CE9d9b62416B9095CaD13)

- SuperNFT

  [0x9FeA082420CaBCae227aab5042b772636bcf00da](https://sepolia.arbiscan.io/address/0x9FeA082420CaBCae227aab5042b772636bcf00da)

- SampleVRF

  [0x9370c082dabfb847b6f4d7b3cf9c001adcc85d8d](https://sepolia.arbiscan.io/address/0x9370c082dabfb847b6f4d7b3cf9c001adcc85d8d)

- Game

  [0xE464705F67Aa68bb9387b23a68b4c26c60a8d9Dc](https://sepolia.arbiscan.io/address/0xE464705F67Aa68bb9387b23a68b4c26c60a8d9Dc)

## デプロイ済みコントラクトの情報(zKatana)

- Example

  [0xD3095061512BCEA8E823063706BB9B15F75b187b](https://zkatana.blockscout.com/address/0xD3095061512BCEA8E823063706BB9B15F75b187b)

## task の動かし方

- 404mint

  ```bash
  npx hardhat 404mint --to 0x1295BDc0C102EB105dC0198fdC193588fe66A1e4 --network zKatana
  ```

- getGameInfo

  ```bash
  npx hardhat getGameInfo --network zKyoto
  ```

- play game

  ```bash
  npx hardhat playGame  --count 250 --network zKyoto
  ```

- update enemyURL

  ```bash
  npx hardhat changeEnemyUrl --newurl https://bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link/gif/sampleGif.gif --network zKyoto
  ```

## flatten コントラクトを作成するコマンド

```bash
npx hardhat flatten contracts/v5/WakuWakuGameV5.sol > contracts/flatten/flatten.sol
```
