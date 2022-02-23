//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import ERC20 from "../abi/ERC20";
import useParasset from "./useParasset";
import { getToNumber } from "../utils/formatBalance";
const useTotalSupply = (token: ERC20) => {
  const [totalSupply, setTotalSupply] = useState(0);
  const parasset = useParasset();

  const fetchTotalSupply = useCallback(async () => {
    if (token) {
      const totalSupply = await token.totalSupply(parasset.myAccount);
      setTotalSupply(getToNumber(totalSupply, token.decimal));
    }
  }, [parasset?.myAccount, parasset?.provider, token]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (parasset?.myAccount) {
        fetchTotalSupply().catch((err) =>
          console.error(`Failed to fetch token totalSupply: ${err.stack}`)
        );
      }
    }, 1000);
    return () => clearInterval(refreshInterval);
  }, [parasset?.myAccount, token]);

  return totalSupply;
};

export default useTotalSupply;
