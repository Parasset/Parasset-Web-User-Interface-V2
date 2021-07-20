import { useCallback, useEffect, useState } from "react";
import { BigNumber } from "ethers";
import ERC20 from "../basis-cash/ERC20";
import useBasisCash from "./useBasisCash";
import config from "../config";
import { getTonumber } from "./../utils/formatBalance";
const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(0);
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    if (token) {
      if (token.symbol === "ETH") {
        const balance = await basisCash.provider.getBalance(
          basisCash.myAccount
        );
        setBalance(getTonumber(balance, token.decimal));
      } else {
        const balance = await token.balanceOf(basisCash.myAccount);
        setBalance(getTonumber(balance, token.decimal));
      }
    }
  }, [basisCash?.myAccount, basisCash?.provider, token]);

  useEffect(() => {
    if (basisCash?.myAccount) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`)
      );
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [basisCash?.myAccount, token]);

  return balance;
};

export default useTokenBalance;
