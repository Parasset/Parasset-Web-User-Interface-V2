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
      ASET: ["0xc27AaDec435E161f45833CB72c1d22813f4374BB", 18],
      USDT: ["0x3b9c324b529b900519d79497Aa18D9cb2728d88F", 6],
      NEST: ["0x123c1A3430Fc20BF521EcD6A1B0910323C61F18F", 18],
      PUSD: ["0x6fd00A9b0cA9e46729CaCC602aee73BBc63dd445", 18],
      PETH: ["0xC480aFA97B1e9ad458Ef8A8D33C5481615475683", 18],
      ETH: ["0xC480aFA97B1e9ad458Ef8A8D33C5481615475683", 18],
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
      ASET: ["0xc27AaDec435E161f45833CB72c1d22813f4374BB", 18],
      USDT: ["0x3b9c324b529b900519d79497Aa18D9cb2728d88F", 6],
      NEST: ["0x123c1A3430Fc20BF521EcD6A1B0910323C61F18F", 18],
      PUSD: ["0x6fd00A9b0cA9e46729CaCC602aee73BBc63dd445", 18],
      PETH: ["0xC480aFA97B1e9ad458Ef8A8D33C5481615475683", 18],
      ETH: ["0xC480aFA97B1e9ad458Ef8A8D33C5481615475683", 18],
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
  },
  ETHPETHPool: {
    name: "ETH-PETH",
    icon1: "ETH",
    icon2: "PETH",
    contract: "PETHInsPool",
    depositTokenName: "ETH",
    earnTokenName: "PETH",
    LPTokenName: "LP-ETH",
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
