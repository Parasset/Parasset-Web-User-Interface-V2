//@ts-nocheck
import { ChainId } from "@uniswap/sdk";
import { Configuration } from "./abi/config";
import { MineInfo } from "./abi";

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: "https://rinkeby.etherscan.io/",
    defaultProvider:
      process.env.REACT_APP_INFURA_RINKEBY_KEY ?? "",
    deployments: require("./abi/deployments/deployments.rinkeby.json"),
    externalTokens: {
      ASET: ["0xBA00239Dc53282207e2101CE78c70ca9E0592b57", 18],
      USDT: ["0x813369c81AfdB2C84fC5eAAA38D0a64B34BaE582", 6],
      NEST: ["0x2Eb7850D7e14d3E359ce71B5eBbb03BbE732d6DD", 18],
      PUSD: ["0xD51e8b129834F3Ae6855dd947f25726572862135", 18],
      PETH: ["0x74E1cCEEB67bF8d56D7c28D5bB0cE388DF46e509", 18],
      ETH: ["0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD", 18],
      PBTC: ["0x4A3d5e6338A15A778eC342Ee007037911a4DdF52", 18],
      HBTC: ["0x8eF7Eec35b064af3b38790Cd0Afd3CF2FF5203A4", 18],
    },
    refreshInterval: 1000,
    assetPrice: 2,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: "https://etherscan.io/",
    defaultProvider:
      process.env.REACT_APP_INFURA_MAINNET_KEY ?? "",
    deployments: require("./abi/deployments/deployments.mainnet.json"),
    externalTokens: {
      ASET: ["0x139cec55d1ec47493dfa25ca77c9208aba4d3c68", 18],
      USDT: ["0xdac17f958d2ee523a2206206994597c13d831ec7", 6],
      NEST: ["0x04abEdA201850aC0124161F037Efd70c74ddC74C", 18],
      PUSD: ["0xCCEcC702Ec67309Bc3DDAF6a42E9e5a6b8Da58f0", 18],
      PETH: ["0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD", 18],
      ETH: ["0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD", 18],
      PBTC: ["", 18],
      HBTC: ["", 18],
    },
    refreshInterval: 1000,
    assetPrice: 2,
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
    key: "ETHPUSD",
    icon1: "ETH",
    icon2: "PUSD",
    contract: "PUSDMorPool",
    depositTokenName: "ETH",
    earnTokenName: "PUSD",
    liqUnit: "USDT",
  },
  NESTPUSD: {
    name: "NEST-PUSD",
    key: "NESTPUSD",
    icon1: "NEST",
    icon2: "PUSD",
    contract: "PUSDMorPool",
    depositTokenName: "NEST",
    earnTokenName: "PUSD",
    liqUnit: "USDT",
  },

  NESTPETH: {
    name: "NEST-PETH",
    key: "NESTPETH",
    icon1: "NEST",
    icon2: "PETH",
    contract: "PETHMorPool",
    depositTokenName: "NEST",
    earnTokenName: "PETH",
    liqUnit: "ETH",
  },
};

export default configurations[process.env.REACT_APP_NODE_ENV || "development"];
