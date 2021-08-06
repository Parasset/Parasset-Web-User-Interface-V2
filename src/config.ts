//@ts-nocheck
import { ChainId } from "@uniswap/sdk";
import { Configuration } from "./basis-cash/config";
import { MineInfo } from "./basis-cash";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber } from "ethers";

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: "https://rinkeby.etherscan.io/",
    defaultProvider:
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    deployments: require("./basis-cash/deployments/deployments.mainnet.json"),
    externalTokens: {
      ASET: ["0xBA00239Dc53282207e2101CE78c70ca9E0592b57", 18],
      USDT: ["0x813369c81AfdB2C84fC5eAAA38D0a64B34BaE582", 6],
      NEST: ["0x2Eb7850D7e14d3E359ce71B5eBbb03BbE732d6DD", 18],
      PUSD: ["0xD51e8b129834F3Ae6855dd947f25726572862135", 18],
      PETH: ["0x74E1cCEEB67bF8d56D7c28D5bB0cE388DF46e509", 18],
      ETH: ["0x74E1cCEEB67bF8d56D7c28D5bB0cE388DF46e509", 18],
    },
    refreshInterval: 1000,
    asetPrice:2
  },
  production: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: "https://rinkeby.etherscan.io/",
    defaultProvider:
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    deployments: require("./basis-cash/deployments/deployments.mainnet.json"),
    externalTokens: {
      ASET: ["0xBA00239Dc53282207e2101CE78c70ca9E0592b57", 18],
      USDT: ["0x813369c81AfdB2C84fC5eAAA38D0a64B34BaE582", 6],
      NEST: ["0x2Eb7850D7e14d3E359ce71B5eBbb03BbE732d6DD", 18],
      PUSD: ["0xD51e8b129834F3Ae6855dd947f25726572862135", 18],
      PETH: ["0x74E1cCEEB67bF8d56D7c28D5bB0cE388DF46e509", 18],
      ETH: ["0x74E1cCEEB67bF8d56D7c28D5bB0cE388DF46e509", 18],
    },
    refreshInterval: 1000,
    asetPrice:2
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

export const itankDefinitions = {
  USDTPUSDPool: {
    name: "USDT-PUSD",
    icon1: "USDT",
    icon2: "PUSD",
    contract: "PUSDInsPool",
    depositTokenName: "USDT",
    earnTokenName: "PUSD",
    LPTokenName: "LP-USD",
    earnName: "ASET",
  },
  ETHPETHPool: {
    name: "ETH-PETH",
    icon1: "ETH",
    icon2: "PETH",
    contract: "PETHInsPool",
    depositTokenName: "ETH",
    earnTokenName: "PETH",
    LPTokenName: "LP-ETH",
    earnName: "ASET",
  },
};


export const debtDefinitions = {
  ETHPUSD: {
    name: "ETH-PUSD",
    key:'ETHPUSD',
    icon1: "ETH",
    icon2: "PUSD",
    contract: "PUSDMorPool",
    depositTokenName: "ETH",
    earnTokenName: "PUSD",
    liqUnit:'USDT'
  },
  NESTPUSD: {
    name: "NEST-PUSD",
    key:'NESTPUSD',
    icon1: "NEST",
    icon2: "PUSD",
    contract: "PUSDMorPool",
    depositTokenName: "NEST",
    earnTokenName: "PUSD",
    liqUnit:'USDT'
  },

  NESTPETH: {
    name: "NEST-PETH",
    key:'NESTPETH',
    icon1: "NEST",
    icon2: "PETH",
    contract: "PETHMorPool",
    depositTokenName: "NEST",
    earnTokenName: "PETH",
    liqUnit:'ETH'
  },
};

export default configurations[process.env.NODE_ENV || "development"];
