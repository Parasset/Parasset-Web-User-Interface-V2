//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "../../state/application/hooks";
import useParasset from "../useParasset";
import BigNumber from "bignumber.js";
import { getToNumber } from "../../utils/formatBalance";
const useTVL = (mortgagePoolContract, token, price) => {
  const [tvl, setTvl] = useState(0);
  const parasset = useParasset();
  const block = useBlockNumber();
  const fetchTvl = useCallback(async () => {
    if (token && mortgagePoolContract) {
      if (token.symbol === "ETH") {
        const balance = await parasset.provider.getBalance(
          mortgagePoolContract.address
        );

        setTvl(
          new BigNumber(getToNumber(balance, token.decimal))
            .times(price)
            .toNumber()
        );
      } else if (token.symbol === "NEST") {
        const balance = await token.balanceOf(mortgagePoolContract.address);

        setTvl(
          new BigNumber(getToNumber(balance, token.decimal))
            .times(price)
            .toNumber()
        );
      }
    }
  }, [
    parasset?.myAccount,
    parasset?.provider,
    mortgagePoolContract,
    token,
    price,
  ]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      parasset?.myAccount &&
      mortgagePoolContract &&
      token &&
      price &&
      refreshInterval
    ) {
      fetchTvl();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, mortgagePoolContract, block, token, price]);

  return tvl;
};

export default useTVL;
