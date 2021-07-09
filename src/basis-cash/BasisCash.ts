//@ts-nocheck

import { Configuration } from "./config";
import { Contract, ethers, Overrides } from "ethers";
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

  async stake(amount, poolName, pid) {
    try {
      const pool = this.contracts[poolName];
      return await pool.deposit(pid, amount, this.gasOptions());
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 126 ~ BasisCash ~ stake ~ error",
        error,
        amount,
        poolName,
        pid
      );
    }
  }

  async unstake(amount, poolName, pid) {
    const pool = this.contracts[poolName];
    console.log(
      "🚀 ~ file: BasisCash.ts ~ line 91 ~ BasisCash ~ unstake ~ amount",
      amount
    );
    return await pool.withdraw(pid, amount, this.gasOptions());
  }

  async harvest(address, ) {
    const { Mine } = this.contracts;
    return await Mine.getReward(address, this.gasOptions());
  }
}
