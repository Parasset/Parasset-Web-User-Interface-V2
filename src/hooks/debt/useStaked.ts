//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "../../state/application/hooks";
import useParasset from "../useParasset";
import { getToNumber } from "../../utils/formatBalance";
const useStaked = (mortgagePoolContract, token) => {
  const [staked, setStaked] = useState(0);
  const parasset = useParasset();
  const block = useBlockNumber();
  const fetchStaked = useCallback(async () => {
    if (token && mortgagePoolContract) {
      if (token.symbol === "ETH") {
        const balance = await await parasset.provider.getBalance(
          mortgagePoolContract.address
        );

        setStaked(getToNumber(balance, token.decimal));
      } else if (token.symbol === "NEST") {
        const balance = await token.balanceOf(mortgagePoolContract.address);

        setStaked(getToNumber(balance, token.decimal));
      }
    }
  }, [parasset?.myAccount, parasset?.provider, mortgagePoolContract, token]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      parasset?.myAccount &&
      mortgagePoolContract &&
      token &&
      refreshInterval
    ) {
      fetchStaked();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, mortgagePoolContract, block, token]);

  return staked;
};

export default useStaked;
