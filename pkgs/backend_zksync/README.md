# zkSync Hardhat project template

This project was scaffolded with [zksync-cli](https://github.com/matter-labs/zksync-cli).

## How to Use

- compile

  ```bash
  yarn compile
  ```

- setup

  ```bash
  yarn setup --network zkSyncSepoliaTestnet
  ```

- deployPaymaster

  ```bash
  yarn deployPaymaster  --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ yarn hardhat deploy-zksync --script deploy-paymaster.ts --network zkSyncSepoliaTestnet
  $ /Users/harukikondo/git/zkSync-Sample/custom-paymaster-tutorial/node_modules/.bin/hardhat deploy-zksync --script deploy-paymaster.ts --network zkSyncSepoliaTestnet

  Starting deployment process of "MyERC20"...
  Estimated deployment cost: 0.005333739939462546 ETH

  "MyERC20" was successfully deployed:

  - Contract address: 0x37885ac16113C4Ba172c13e2921d3cdD55B8FE99
  - Contract source: contracts/MyERC20.sol:MyERC20
  - Encoded constructor arguments: 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000074d79546f6b656e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074d79546f6b656e00000000000000000000000000000000000000000000000000

  Requesting contract verification...
  Your verification ID is: 12980
  Contract successfully verified on zkSync block explorer!

  Starting deployment process of "MyPaymaster"...
  Estimated deployment cost: 0.003104535204779398 ETH

  "MyPaymaster" was successfully deployed:

  - Contract address: 0x7BB1E399F58d1c6E809e309cABA70E339d68181F
  - Contract source: contracts/MyPaymaster.sol:MyPaymaster
  - Encoded constructor arguments: 0x00000000000000000000000037885ac16113c4ba172c13e2921d3cdd55b8fe99

  Requesting contract verification...
  Your verification ID is: 12981
  Contract successfully verified on zkSync block explorer!
  Funding paymaster with ETH...
  Paymaster ETH balance is now 30000000000000000
  Minted 3 tokens for the wallet
  Done!
  ```

  [MyPaymaster](https://sepolia.explorer.zksync.io/address/0x7BB1E399F58d1c6E809e309cABA70E339d68181F)

  [MyERC20](https://sepolia.explorer.zksync.io/address/0x37885ac16113C4Ba172c13e2921d3cdD55B8FE99)

- usePaymaster

  ```bash
  yarn usePaymaster --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ hardhat usePaymaster --network zkSyncSepoliaTestnet
  ERC20 token balance of the wallet before mint: 3
  Paymaster ETH balance is 30000000000000000
  Transaction fee estimation is :>>  2863942551682840
  Minting 5 tokens for the wallet via paymaster...
  Paymaster ERC20 token balance is now 1
  Paymaster ETH balance is now 29666432043991276
  ERC20 token balance of the the wallet after mint: 7
  ✨  Done in 6.91s.
  ```

- deployGaslessPaymaster

  ```bash
  yarn deployGaslessPaymaster --network zkSyncSepoliaTestnet
  ```

- deploy

  ```bash
  yarn deploy --network zkSyncSepoliaTestnet
  ```

- useGaslessPaymaster

  ```bash
  yarn useGaslessPaymaster --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ hardhat useGaslessPaymaster --network zkSyncSepoliaTestnet
  ERC20 token balance of the wallet before mint: 7
  Paymaster ETH balance is 5000000000000000
  Transaction fee estimation is :>>  112442800000000
  Minting 5 tokens for the wallet via paymaster...
  Paymaster ERC20 token balance is now 0
  Paymaster ETH balance is now 4978129200000000
  ERC20 token balance of the the wallet after mint: 7
  ✨  Done in 5.08s.
  ```

- deploy nfts

  ```bash
  yarn deployNft --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ yarn hardhat deploy-zksync --script deploy-nft.ts --network zkSyncSepoliaTestnet
  $ /Users/harukikondo/git/zkSync-Sample/custom-paymaster-tutorial/node_modules/.bin/hardhat deploy-zksync --script deploy-nft.ts --network zkSyncSepoliaTestnet
  Running deploy script for the GaslessPaymaster contract...

  Starting deployment process of "WakuWakuNFT"...
  Estimated deployment cost: 0.0114024872 ETH

  "WakuWakuNFT" was successfully deployed:
  - Contract address: 0x54fc050Fc825ec97F86Fcc4Fb6f9E2CAA285b662
  - Contract source: contracts/nft/WakuWakuNFT.sol:WakuWakuNFT
  - Encoded constructor arguments: 0x00000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad072

  Requesting contract verification...
  Your verification ID is: 13009
  Contract successfully verified on zkSync block explorer!
  WakuWakuNFT address: 0x54fc050Fc825ec97F86Fcc4Fb6f9E2CAA285b662

  Starting deployment process of "WakuWakuSuperNFT"...
  Estimated deployment cost: 0.011388843 ETH

  "WakuWakuSuperNFT" was successfully deployed:
  - Contract address: 0x7CF718459bc5C7489AF882fD8E788FAD954952c3
  - Contract source: contracts/nft/WakuWakuSuperNFT.sol:WakuWakuSuperNFT
  - Encoded constructor arguments: 0x00000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad072

  Requesting contract verification...
  Your verification ID is: 13010
  Contract successfully verified on zkSync block explorer!
  WakuWakuSuperNFT address: 0x7CF718459bc5C7489AF882fD8E788FAD954952c3

  Starting deployment process of "BattleCardNFT"...
  Estimated deployment cost: 0.0113971906 ETH

  "BattleCardNFT" was successfully deployed:
  - Contract address: 0x03b3E4Bc118E33987c77030FCE3593E65f6D1656
  - Contract source: contracts/nft/BattleCardNFT.sol:BattleCardNFT
  - Encoded constructor arguments: 0x00000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad072

  Requesting contract verification...
  Your verification ID is: 13011
  Contract successfully verified on zkSync block explorer!
  BattleCardNFT address: 0x03b3E4Bc118E33987c77030FCE3593E65f6D1656
  Done!
  ```

- deploy WakuWakuGameV5 Contract

  ```bash
  yarn deployGame --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ yarn hardhat deploy-zksync --script deploy-game.ts --network zkSyncSepoliaTestnet
  $ /Users/harukikondo/git/zkSync-Sample/custom-paymaster-tutorial/node_modules/.bin/hardhat deploy-zksync --script deploy-game.ts --network zkSyncSepoliaTestnet
  Running deploy script for the Game contract...

  Starting deployment process of "WakuWakuGameV5"...
  Estimated deployment cost: 0.009090597 ETH

  "WakuWakuGameV5" was successfully deployed:
  - Contract address: 0x4daa43F951b1993D2E5dd92F8f98A89017F69280
  - Contract source: contracts/game/WakuWakuGameV5.sol:WakuWakuGameV5
  - Encoded constructor arguments: 0x00000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad072

  Requesting contract verification...
  Your verification ID is: 13019
  Contract successfully verified on zkSync block explorer!
  WakuWakuGameV5 address: 0x4daa43F951b1993D2E5dd92F8f98A89017F69280
  NFT's ownership transfering from 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 to 0x4daa43F951b1993D2E5dd92F8f98A89017F69280
  NFT's ownership transfered from 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 to 0x4daa43F951b1993D2E5dd92F8f98A89017F69280
  SuperNFT's ownership transfering from 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 to 0x4daa43F951b1993D2E5dd92F8f98A89017F69280
  SuperNFT's ownership transfered from 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 to 0x4daa43F951b1993D2E5dd92F8f98A89017F69280
  BatteleCardNFT's ownership transfering from 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 to 0x4daa43F951b1993D2E5dd92F8f98A89017F69280
  BatteleCardNFT's ownership transfered from 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 to 0x4daa43F951b1993D2E5dd92F8f98A89017F69280
  Done!
  ```

  [WakuWakuGameV5 - 0x4daa43F951b1993D2E5dd92F8f98A89017F69280](https://sepolia.explorer.zksync.io/address/0x4daa43F951b1993D2E5dd92F8f98A89017F69280)

- create new game

  ```bash
  yarn createGame --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ npx hardhat createGame --network zkSyncSepoliaTestnet
  Paymaster ETH balance is 4920807300000000
  Wallet ETH balance is 5020151983331008468
  Transaction fee estimation is :>>  39853000000000
  Create game via paymaster...
  tx Hash: 0xb9cda560060be97417d0da91ebbfc163c3069327a032317e69fe0127354d24d0
  Paymaster ETH balance is now 4911941200000000
  Wallet ETH balance is 5020151983331008468
  ✨  Done in 6.83s.
  ```

- getGameInfo

  ```bash
  yarn getGameInfo  --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ npx hardhat getGameInfo --network zkSyncSepoliaTestnet
  gameInfo: Result(10) [
    'SampleGame',
    1n,
    true,
    '0x54fc050Fc825ec97F86Fcc4Fb6f9E2CAA285b662',
    '0x7CF718459bc5C7489AF882fD8E788FAD954952c3',
    '0x03b3E4Bc118E33987c77030FCE3593E65f6D1656',
    200n,
    0n,
    '0x0000000000000000000000000000000000000000',
    Result(2) [
      'https://bafkreie4o7bbfitr4vmuckphvmf7n3aettzb57necosjf3oo5e5syhcfgq.ipfs.w3s.link/',
      50n
    ]
  ]
  partipants: 0n
  ✨  Done in 2.92s.
  ```

- play game

  ```bash
  yarn playGame --count 250 --network zkSyncSepoliaTestnet
  ```

  ```bash
  yarn run v1.22.19
  $ npx hardhat playGame --count 100 --network zkSyncSepoliaTestnet
  Paymaster ETH balance is 4896772000000000
  Wallet ETH balance is 5020151983331008468
  Transaction fee estimation is :>>  31031000000000
  transfer NFT via paymaster...
  safe NFT tx Hash: 0xa5b803591259cf3f02df5c8fa04480b2fd73e5decb6e6c288a0a42ade316c4e8
  Paymaster ETH balance is now 4886673800000000
  Wallet ETH balance is 5020151983331008468
  Transaction fee estimation is :>>  66183400000000
  play game via paymaster...
  tx Hash: 0x3b1fd4dacc9b83087f034748ae517202a860c8c8307ee13b0d53edf3f743ef62
  Paymaster ETH balance is now 4886673800000000
  Wallet ETH balance is 5020151983331008468
  ✨  Done in 8.61s.
  ```
