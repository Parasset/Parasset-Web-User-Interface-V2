//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "../../state/application/hooks";
import useParasset from "../useParasset";
import BigNumber from "bignumber.js";
import { getToNumber } from "../../utils/formatBalance";
const useTVL = (mortgagePoolContract, token, price) => {
  const [tvl, setTvl] = useState(0);
  const basisCash = useParasset();
  const block = useBlockNumber();
  const fetchTvl = useCallback(async () => {
    if (token && mortgagePoolContract) {
      if (token.symbol === "ETH") {
        const balance = await await basisCash.provider.getBalance(
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
    basisCash?.myAccount,
    basisCash?.provider,
    mortgagePoolContract,
    token,
    price,
  ]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      basisCash?.myAccount &&
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
  }, [basisCash?.myAccount, mortgagePoolContract, block, token, price]);

  return tvl;
};

export default useTVL;
