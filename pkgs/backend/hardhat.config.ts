import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import {HardhatUserConfig} from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

const {
  PRIVATE_KEY,
  GAS_REPORT,
  COINMARKETCAP_API_KEY,
  SNOWTRACE_API_KEY,
  ARBITRUMSCAN_API_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: [`${PRIVATE_KEY}`],
    },
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: [`${PRIVATE_KEY}`],
      chainId: 421614,
    },
  },
  gasReporter: {
    enabled: GAS_REPORT ? true : false,
    currency: "JPY",
    gasPrice: 20,
    token: "ETH",
    coinmarketcap: COINMARKETCAP_API_KEY,
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: SNOWTRACE_API_KEY!,
      arbitrumSepolia: ARBITRUMSCAN_API_KEY!,
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://sepolia-rollup.arbitrum.io/rpc",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
    ],
  },
};

export default config;
