//@ts-nocheck
import BigNumber1 from "bignumber.js";
export const getNumberToAll = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  const displayBalance = balance.dividedBy(new BigNumber1(10).pow(decimals));
  const dp = displayBalance.dp();
  return displayBalance.toFixed(dp);
};

export const getNumberToMax = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  const displayBalance = balance.dividedBy(new BigNumber1(10).pow(decimals));
  var dp = displayBalance.dp();
  dp = dp > 8 ? 8 : dp;
  return displayBalance.toFixed(dp);
};
export const getNumberToMax1 = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  const displayBalance = balance.dividedBy(new BigNumber1(10).pow(decimals));
  var dp = displayBalance.dp();

  dp = dp > 3 ? 3 : dp;
  return displayBalance.toFixed(dp);
};
export const getDisplayNumber = (
  balance: any,
  decimals = 18,
  fractionDigits = 3
) => {
  balance = new BigNumber1(balance.toString());
  const displayBalance = balance.dividedBy(new BigNumber1(10).pow(decimals));
  return displayBalance.toFixed(fractionDigits);
};

export const getTonumber = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  return balance.dividedBy(new BigNumber1(10).pow(decimals)).toNumber();
};
export const getToBignumber = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  return balance.dividedBy(new BigNumber1(10).pow(decimals));
};

export const getNoDecimalsTonumber = (balance: any) => {
  return balance.toNumber();
};
