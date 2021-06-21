import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';
import { formatUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 97,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      DAI: ['0xc27AaDec435E161f45833CB72c1d22813f4374BB', 18],
      ETH: ['0x33680C72C40e0dddd11Fbf7c48517444aa9BDA82', 18],
      USDT: ['0xE797C574973Cbb4FC9aF15eC0163bBc5B2C684c0', 18],
      OXY: ['0xCA89EEA9FABC8Aa275E15659d40A6490c6f41a40', 18],
      BNB: ['0xCA89EEA9FABC8Aa275E15659d40A6490c6f41a40', 18],
      'GAC_USDT-UNI-LPv2': ['0xe026260894966154d419f8ea98bafde646580bed', 18],
      'GAS_USDT-UNI-LPv2': ['0x98cbd62d948e2eff3489fdc850357f0916e21a46', 18],
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 1000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://mainnet.infura.io/v3/06ecf536272c43c78adfba29b908a68d',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
    },
    baseLaunchDate: new Date('2020-11-29T23:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  GACBNBPool: {
    name: 'Earn GAC by BNB',
    contract: 'GACBNBPool',
    depositTokenName: 'BNB',
    earnTokenName: 'GAC',
    finished: false,
    sort: 3,
  },
  GACDAIPool: {
    name: 'Earn GAC by DAI',
    contract: 'GACDAIPool',
    depositTokenName: 'DAI',
    earnTokenName: 'GAC',
    finished: false,
    sort: 4,
  },
  GACETHPool: {
    name: 'Earn GAC by ETH',
    contract: 'GACETHPool',
    depositTokenName: 'ETH',
    earnTokenName: 'GAC',
    finished: false,
    sort: 5,
  },
  GACOXYPool: {
    name: 'Earn GAC by OXY',
    contract: 'GACOXYPool',
    depositTokenName: 'OXY',
    earnTokenName: 'GAC',
    finished: false,
    sort: 6,
  },
  GACUSDTPool: {
    name: 'Earn GAC by USDT',
    contract: 'GACUSDTPool',
    depositTokenName: 'USDT',
    earnTokenName: 'GAC',
    finished: false,
    sort: 7,
  },
  USDTGACLPTokenSharePool: {
    name: 'Earn GAS by GAC-USDT-LP',
    contract: 'USDTGACLPTokenSharePool',
    depositTokenName: 'GAC_USDT-UNI-LPv2',
    earnTokenName: 'GAS',
    finished: false,
    sort: 1,
  },
  USDTGASLPTokenSharePool: {
    name: 'Earn GAS by GAS-USDT-LP',
    contract: 'USDTGASLPTokenSharePool',
    depositTokenName: 'GAS_USDT-UNI-LPv2',
    earnTokenName: 'GAS',
    finished: false,
    sort: 2,
  },
};

export const stakeLimit = {
  OXY: 5000,
  BNB: 500,
  ETH: 50,
  USDT: 5000,
  DAI: 5000,
  'GAC_USDT-UNI-LPv2': 10000000000,
  'GAS_USDT-UNI-LPv2': 10000000000,
};

export default configurations[process.env.NODE_ENV || 'development'];
