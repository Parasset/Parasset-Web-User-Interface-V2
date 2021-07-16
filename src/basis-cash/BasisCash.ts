//@ts-nocheck

import { Configuration } from "./config";
import { Contract, ethers, Overrides } from "ethers";
import BigNumber from "bignumber.js";
import {
  getDisplayNumber,
  getToBignumber,
  getTonumber,
} from "../utils/formatBalance";
import { getDefaultProvider } from "../utils/provider";
import ERC20 from "./ERC20";
/**
 * An API module of Gaea Coin contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class BasisCash {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(
        deployment.address,
        deployment.abi,
        provider
      );
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(
        address,
        provider,
        symbol,
        decimal
      ); // TODO: add decimal
    }

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(
      provider,
      this.config.chainId
    );

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  gasOptions() {
    return {
      // gasLimit: 300000000,
      from: this.myAccount,
    };
  }

  async getStaked(address, account = this.myAccount) {
    try {
      const { Mine } = this.contracts;

      let staked = await Mine.getBalance(address, account);
      return staked;
    } catch (error) {
      return "0";
    }
  }
  async getEarned(address, account = this.myAccount) {
    try {
      const { Mine } = this.contracts;

      let earned = await Mine.getAccountReward(address, account);
      return getTonumber(earned);
    } catch (error) {
      return "0";
    }
  }
  async getFundBalance(token, address) {
    try {
      let balance = await token.balanceOf(address);
      return getTonumber(balance, token.decimal);
    } catch (error) {
      return "0";
    }
  }
  async getTotalSupply(token) {
    try {
      let totalSupply = await token.totalSupply();
      return getTonumber(totalSupply, token.decimal);
    } catch (error) {
      return "0";
    }
  }

  async getAvgPrice() {
    try {
      const { NestQuery } = this.contracts;
      const { USDT } = this.externalTokens;
      let { avgPrice } = await NestQuery.triggeredPriceInfo(USDT.address);
      return getTonumber(avgPrice, USDT.decimal);
    } catch (error) {
      return "0";
    }
  }

  async getFundAsset(itank) {
    try {
  

      const {
        depositToken,
        earnToken,
        depositTokenName,
        itankContract,
        address,
      } = itank;
      let depositFundBalance = 0;

      if (depositTokenName !== "ETH") {
        depositFundBalance = await this.getFundBalance(depositToken, address);
      } else {
        depositFundBalance = await this.provider.getBalance(this.myAccount);
        depositFundBalance = getTonumber(depositFundBalance);
      }
      let earnFundBalance = await this.getFundBalance(earnToken, address);
      let negative = await itankContract._insNegative();
      earnFundBalance = new BigNumber(earnFundBalance)
        .minus(getTonumber(negative))
        .toNumber();

      let avgPrice = await this.getAvgPrice();

      let depositFundValue =
        itank.depositTokenName === "USDT"
          ? depositFundBalance * 1
          : new BigNumber(depositFundBalance).times(avgPrice).toNumber();
      let earnFundValue =
        itank.depositTokenName === "USDT"
          ? earnFundBalance * 1
          : new BigNumber(earnFundBalance).times(avgPrice).toNumber();
      const totalSupply = await this.getTotalSupply(itankContract);
      let totalAssets = new BigNumber(depositFundBalance).plus(earnFundBalance);
      let perShare = totalAssets.div(totalSupply).toNumber();
      totalAssets = totalAssets.toNumber();
      return {
        depositFundBalance,
        earnFundBalance,
        depositFundValue,
        earnFundValue,
        perShare,
        totalSupply,
        totalAssets,
        avgPrice,
      };
    } catch (error) {
      return {
        depositFundBalance: 0,
        earnFundBalance: 0,
        depositFundValue: 0,
        earnFundValue: 0,
        perShare: 0,
        totalSupply: 0,
        totalAssets: 0,
        avgPrice: 0,
      };
    }
  }

  async getChannelInfo(address, block) {
    try {
      const { Mine } = this.contracts;

      let info = await Mine.getChannelInfo(address);
      const endBlock = info.endBlock.toNumber();
      return {
        rewardRate: block > endBlock ? 0 : getTonumber(info.rewardRate),
        totalSupply: getTonumber(info.totalSupply),
      };
    } catch (error) {
      return "0";
    }
  }

  async stake(amount, address) {
    try {
      const { Mine } = this.contracts;
      return await Mine.stake(amount, address, this.gasOptions());
    } catch (error) {
    }
  }

  async unstake(amount, address) {
    try {
      const { Mine } = this.contracts;

      return await Mine.withdraw(amount, address, this.gasOptions());
    } catch (error) {
    }
  }

  async harvest(address) {
    const { Mine } = this.contracts;
    return await Mine.getReward(address, this.gasOptions());
  }
}
