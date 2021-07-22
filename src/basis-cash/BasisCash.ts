//@ts-nocheck

import { Configuration } from "./config";
import { Contract, ethers, Overrides } from "ethers";
import BigNumber from "bignumber.js";
import {
  getDisplayNumber,
  getToBignumber,
  getTonumber,
} from "../utils/formatBalance";
import { formatDate } from "../utils/utils";

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

  async getMaxRatio(mortgagePoolContract, mortgageToken) {
    try {
      let maxRatio = await mortgagePoolContract.getMaxRate(
        mortgageToken.symbol === "ETH"
          ? "0x0000000000000000000000000000000000000000"
          : mortgageToken.address
      );
      return maxRatio.toNumber() / 100000;
    } catch (err) {
      console.log(err, "err");
      return "0";
    }
  }

  async getStableFee(mortgagePoolContract, mortgageToken, uToken, address) {
    try {
      // mortgageToken	抵押资产地址
      // tokenPrice	抵押资产相对于ETH的价格数量
      // uTokenPrice	标的资产相对于ETH的价格数量（将从nest获取的数据直接传入，不需要做精度转换）
      // maxRateNum	最大抵押率限制
      // owner	债仓所有人地址
      const { NestQuery } = this.contracts;

      let { avgPrice: tokenPrice } = await NestQuery.triggeredPriceInfo(
        mortgageToken.address
      );

      let { avgPrice: avgPriceUToken } = await NestQuery.triggeredPriceInfo(
        uToken.address
      );

      let uTokenPrice = "";
      if (uToken.symbol === "PETH") {
        uTokenPrice = "1000000000000000000";
      } else {
        uTokenPrice = avgPriceUToken.toString();
      }

      const mortgageTokenAddress =
        mortgageToken.symbol === "ETH"
          ? "0x0000000000000000000000000000000000000000"
          : mortgageToken.address;

      let maxRateNum = await mortgagePoolContract.getMaxRate(
        mortgageTokenAddress
      );
      
      let { fee } = await mortgagePoolContract.getInfoRealTime(
        mortgageTokenAddress,
        mortgageToken.symbol === "ETH"
          ? "1000000000000000000"
          : tokenPrice.toString(),
        uTokenPrice.toString(),
        maxRateNum,
        address
      );
      
      return getTonumber(fee);
    } catch (err) {
      console.log(err, "err");
      return "0";
    }
  }

  async getNESTToUSDTPrice() {
    try {
      const { NestQuery } = this.contracts;
      const { USDT, NEST } = this.externalTokens;
      let { avgPrice: avgPriceUSDT } = await NestQuery.triggeredPriceInfo(
        USDT.address
      );
      let { avgPrice: avgPriceNEST } = await NestQuery.triggeredPriceInfo(
        NEST.address
      );
      // avgPrice2/avgPrice1=NEST对u的价格
      return new BigNumber(getTonumber(avgPriceUSDT, USDT.decimal))
        .div(getTonumber(avgPriceNEST, NEST.decimal))
        .toNumber();
    } catch (error) {
      return "0";
    }
  }

  async getNESTToETHPrice() {
    try {
      const { NestQuery } = this.contracts;
      const { NEST } = this.externalTokens;
      let { avgPrice } = await NestQuery.triggeredPriceInfo(NEST.address);
      // nest对ETH的价格  1/avgPrice2
      return new BigNumber(1)
        .div(getTonumber(avgPrice, NEST.decimal))
        .toNumber();
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 172 ~ BasisCash ~ getNESTToETHPrice ~ error",
        error
      );
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

  async getLastDate({ itankContract }) {
    try {
      let {
        startTime: nextStartTime,
        endTime: nextEndTime,
      } = await itankContract.getRedemptionTime();
      let {
        startTime: preStartTime,
        endTime: preEndTime,
      } = await itankContract.getRedemptionTimeFront();

      return {
        nextStartTime: formatDate(nextStartTime.toNumber()),
        nextEndTime: formatDate(nextEndTime.toNumber()),
        preStartTime: formatDate(preStartTime.toNumber()),
        preEndTime: formatDate(preEndTime.toNumber()),
        nextStartTimeNum: nextStartTime.toNumber(),
        nextEndTimeNum: nextEndTime.toNumber(),
        preStartTimeNum: preStartTime.toNumber(),
        preEndTimeNum: preEndTime.toNumber(),
      };
    } catch (error) {}
  }

  async getRedemptionAmount(itankContract, decimal, address) {
    try {
      let amount = await itankContract.getRedemptionAmount(address);
      return getTonumber(amount, decimal);
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 246 ~ BasisCash ~ getRedemptionAmount ~ error",
        itankContract,
        error
      );
      return "0";
    }
  }
  async itankStake(itankContract, amount) {
    try {
      return await itankContract.subscribeIns(amount, this.gasOptions());
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 221 ~ BasisCash ~ itankStake ~ error",
        itankContract,
        amount,
        error
      );
    }
  }
  async itankUnstake(itankContract, amount) {
    try {
      return await itankContract.redemptionIns(amount, this.gasOptions());
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 221 ~ BasisCash ~ itankStake ~ error",
        itankContract,
        amount,
        error
      );
    }
  }
  async getExchangeFee(itankContract) {
    try {
      const fee = await itankContract._feeRate();
      return fee.toNumber() / 1000;
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 272 ~ BasisCash ~ itankUnstake ~ error",
        error
      );
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
    } catch (error) {}
  }

  async unstake(amount, address) {
    try {
      const { Mine } = this.contracts;

      return await Mine.withdraw(amount, address, this.gasOptions());
    } catch (error) {}
  }

  async harvest(address) {
    const { Mine } = this.contracts;
    return await Mine.getReward(address, this.gasOptions());
  }
  async exchangePTokenToUnderlying(itankContract, amount) {
    try {
      return await itankContract.exchangePTokenToUnderlying(
        amount,
        this.gasOptions()
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 309 ~ BasisCash ~ exchangePTokenToUnderlying ~ error",
        error
      );
    }
  }

  async exchangeUnderlyingToPToken(itankContract, amount) {
    try {
      return await itankContract.exchangeUnderlyingToPToken(
        amount,
        this.gasOptions()
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 321 ~ BasisCash ~ exchangeUnderlyingToPToken ~ error",
        error
      );
    }
  }

  async coin(mortgagePoolContract, mortgageToken, amount, ratio,value) {
    try {
      return await mortgagePoolContract.coin(
        mortgageToken.address,
        amount,
        ratio,
        {
          // gasLimit: 300000000,
          value,
          from: this.myAccount,
        }
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 443 ~ BasisCash ~ coin ~ error",
        error
      );
    }
  }
}
