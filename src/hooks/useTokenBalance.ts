//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import ERC20 from "../abi/ERC20";
import useParasset from "./useParasset";
import { getToNumber } from "../utils/formatBalance";
const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(0);
  const basisCash = useParasset();

  const fetchBalance = useCallback(async () => {
    if (token) {
      if (token.symbol === "ETH") {
        const balance = await basisCash.provider.getBalance(
          basisCash.myAccount
        );
        setBalance(getToNumber(balance, token.decimal));
      } else {
        const balance = await token.balanceOf(basisCash.myAccount);
        // console.log(token.symbol,formatUnits(balance),getToNumber(balance, token.decimal))
        setBalance(getToNumber(balance, token.decimal));
      }
    }
  }, [basisCash?.myAccount, basisCash?.provider, token]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (basisCash?.myAccount) {
        fetchBalance().catch((err) =>
          console.error(`Failed to fetch token balance: ${err.stack}`)
        );
      }
    }, 1000);
    return () => clearInterval(refreshInterval);
  }, [basisCash?.myAccount]);

  return balance;
};

export default useTokenBalance;
