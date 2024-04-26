// import "@enjinstarter/hardhat-oklink-verify";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import fs from "fs";
import "hardhat-gas-reporter";
import {HardhatUserConfig} from "hardhat/types";
import path from "path";

dotenv.config();

const {
  PRIVATE_KEY,
  GAS_REPORT,
  COINMARKETCAP_API_KEY,
  SNOWTRACE_API_KEY,
  ARBITRUMSCAN_API_KEY,
  POLYGONSCAN_ZKEVM_API_KEY,
  ASTAR_ZKYOTO_SCAN_API_KEY,
  POLYGON_AMOY_RPC_URL,
  OKLINK_API_KEY,
} = process.env;

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
if (!SKIP_LOAD) {
  const taskPaths = ["mock", "util", "game"];
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
      url: `https://pacific-rpc.sepolia-testnet.manta.network/http`,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 3441006,
    },
    polygonZkEvmTestnet: {
      url: `https://rpc.public.zkevm-test.net/`,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 1442,
    },
    amoy: {
      url: POLYGON_AMOY_RPC_URL,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 80002,
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
      zKyoto: ASTAR_ZKYOTO_SCAN_API_KEY!,
      mantaSepolia: ASTAR_ZKYOTO_SCAN_API_KEY!,
      amoy: POLYGONSCAN_ZKEVM_API_KEY!,
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
      {
        network: "zKyoto",
        chainId: 6038361,
        urls: {
          apiURL: "https://rpc.startale.com/zkyoto",
          browserURL: "https://zkyoto.explorer.startale.com/",
        },
      },
      {
        network: "mantaSepolia",
        chainId: 3441006,
        urls: {
          apiURL: "https://pacific-explorer.sepolia-testnet.manta.network/api/",
          browserURL: "https://pacific-explorer.sepolia-testnet.manta.network/",
        },
      },
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL:
            "https://www.oklink.com/api/explorer/v1/contract/verify/async/api/polygonAmoy",
          browserURL: "https://www.oklink.com/amoy",
        },
      },
    ],
  },
};

export default config;
