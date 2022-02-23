//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import ERC20 from "../abi/ERC20";
import useParasset from "./useParasset";
import { getToNumber } from "../utils/formatBalance";
const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(0);
  const parasset = useParasset();

  const fetchBalance = useCallback(async () => {
    if (token) {
      if (token.symbol === "ETH") {
        const balance = await parasset.provider.getBalance(
          parasset.myAccount
        );
        setBalance(getToNumber(balance, token.decimal));
      } else {
        const balance = await token.balanceOf(parasset.myAccount);
        // console.log(token.symbol,formatUnits(balance),getToNumber(balance, token.decimal))
        setBalance(getToNumber(balance, token.decimal));
      }
    }
  }, [parasset?.myAccount, parasset?.provider, token]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (parasset?.myAccount) {
        fetchBalance().catch((err) =>
          console.error(`Failed to fetch token balance: ${err.stack}`)
        );
      }
    }, 1000);
    return () => clearInterval(refreshInterval);
  }, [parasset?.myAccount]);

  return balance;
};

export default useTokenBalance;
