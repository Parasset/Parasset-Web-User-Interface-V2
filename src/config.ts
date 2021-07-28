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
      ASET: ["0x2E699Af89Fac54c7AAA8615B1C6Ef6A562D04a30", 18],
      USDT: ["0xEE93b12b748dd19ac27A8669dC93f99Fa5d0097a", 6],
      NEST: ["0x8d6b97c482ecC00D83979dac4A703Dbff04FD84F", 18],
      PUSD: ["0x0A024898EAC4FFDbA9d1eF3C50063E1b544147C8", 18],
      PETH: ["0x0E08A19F4e9A7077334966305FB23755943b9D30", 18],
      ETH: ["0x0E08A19F4e9A7077334966305FB23755943b9D30", 18],
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
      ASET: ["0x2E699Af89Fac54c7AAA8615B1C6Ef6A562D04a30", 18],
      USDT: ["0xEE93b12b748dd19ac27A8669dC93f99Fa5d0097a", 6],
      NEST: ["0x8d6b97c482ecC00D83979dac4A703Dbff04FD84F", 18],
      PUSD: ["0x0A024898EAC4FFDbA9d1eF3C50063E1b544147C8", 18],
      PETH: ["0x0E08A19F4e9A7077334966305FB23755943b9D30", 18],
      ETH: ["0x0E08A19F4e9A7077334966305FB23755943b9D30", 18],
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
