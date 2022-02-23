//@ts-nocheck
import { useCallback, useEffect, useState } from "react";

import useParasset from "./useParasset";
import { getToNumber } from "../utils/formatBalance";
const useAllowance = (token: any, spender: string) => {
  const [allowance, setAllowance] = useState(0);
  const parasset = useParasset();
  const fetchAllowance = useCallback(async () => {
    if (token) {
      const allowance = await token.allowance(parasset?.myAccount, spender);

      setAllowance(getToNumber(allowance, token.decimal));
    }
  }, [parasset?.myAccount, spender, token]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (parasset?.isUnlocked && spender && token) {
        fetchAllowance().catch((err) =>
          console.log(`Failed to fetch allowance: ${err.stack}`)
        );
      }
    }, 1000);
    return () => clearInterval(refreshInterval);
  }, [parasset?.isUnlocked, parasset?.myAccount, spender, token]);

  return allowance;
};

export default useAllowance;
