//@ts-nocheck
import { ChainId } from "@uniswap/sdk";
import { Configuration } from "./basis-cash/config";
import { MineInfo } from "./basis-cash";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber } from "ethers";

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: "https://rinkeby.etherscan.io",
    defaultProvider:
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    deployments: require("./basis-cash/deployments/deployments.mainnet.json"),
    externalTokens: {
      ASET: ["0xc27AaDec435E161f45833CB72c1d22813f4374BB", 18],
    },

    refreshInterval: 1000,
  },
  production: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: "https://rinkeby.etherscan.io",
    defaultProvider:
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    deployments: require("./basis-cash/deployments/deployments.mainnet.json"),
    externalTokens: {
      ASET: ["0xc27AaDec435E161f45833CB72c1d22813f4374BB", 18],
    },

    refreshInterval: 1000,
  },
};

export const mineDefinitions: { [contractName: string]: MineInfo } = {
  USDTPUSDPool: {
    name: "USDT-PUSD",
    icon1: "USDT",
    icon2: "PUSD",
    contract: "Mine",
    depositTokenName: "LP-USD",
    depositContract: "PUSDInsPool",
    earnTokenName: "ASET",
  },
  ETHPETHPool: {
    name: "ETH-PETH",
    icon1: "ETH",
    icon2: "PETH",
    contract: "Mine",
    depositTokenName: "LP-ETH",
    depositContract: "PETHInsPool",
    earnTokenName: "ASET",
  },
};

export default configurations[process.env.NODE_ENV || "development"];
