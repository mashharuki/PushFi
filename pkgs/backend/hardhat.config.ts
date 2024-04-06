import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import * as dotenv from "dotenv";
import fs from "fs";
import {HardhatUserConfig} from "hardhat/config";
import path from "path";

dotenv.config();

const {
  PRIVATE_KEY,
  GAS_REPORT,
  COINMARKETCAP_API_KEY,
  SNOWTRACE_API_KEY,
  ARBITRUMSCAN_API_KEY,
  POLYGONSCAN_ZKEVM_API_KEY,
} = process.env;

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
if (!SKIP_LOAD) {
  const taskPaths = ["mock", "util"];
  taskPaths.forEach((folder) => {
    const tasksPath = path.join(__dirname, "tasks", folder);
    fs.readdirSync(tasksPath)
      .filter((_path) => _path.includes(".ts"))
      .forEach((task) => {
        require(`${tasksPath}/${task}`);
      });
  });
}

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
    zKyoto: {
      url: `https://rpc.startale.com/zkyoto`,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 6038361,
    },
    mantaSepolia: {
      url: `https://pacific-rpc.testnet.manta.network/http`,
      chainId: 3441006,
    },
    polygonZkEvmTestnet: {
      url: `https://rpc.public.zkevm-test.net/`,
      chainId: 1442,
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
      polygonZkEvmTestnet: POLYGONSCAN_ZKEVM_API_KEY!,
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
      {
        network: "polygonZkEvmTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://rpc.public.zkevm-test.net/",
          browserURL: "https://testnet-zkevm.polygonscan.com/",
        },
      },
    ],
  },
};

export default config;
