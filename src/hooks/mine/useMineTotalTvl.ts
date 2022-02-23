//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import BigNumber from "bignumber.js";
import { useBlockNumber } from "../../state/application/hooks";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";
import useItanks from "../../hooks/itank/useItanks";

const useMineTotalTvl = (mines) => {
  const [totalTvl, setTotalTvl] = useState(0);
  const itanks = useItanks();
  const parasset = useParasset();
  const block = useBlockNumber();

  const fetchTvl = useCallback(async () => {
    let list = await Promise.all(
      mines.map(async (item) => {
        const itank = itanks.find((el) => el.contract === item.depositContract);
        const { depositToken } = item;
        const { tvl } = await parasset.getMineTvl(
          depositToken,
          depositToken.address,
          block,
          itank
        );

        return $isPositiveNumber($isFiniteNumber(tvl));
      })
    );
    let totalTvl = new BigNumber(0);
    list.forEach((item) => {
      totalTvl = totalTvl.plus(item);
    });
    totalTvl = $isPositiveNumber($isFiniteNumber(totalTvl.toNumber()));
    setTotalTvl(totalTvl);
  }, [mines, itanks, block]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      parasset?.myAccount &&
      mines?.length &&
      itanks?.length &&
      refreshInterval
    ) {
      fetchTvl();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, block, mines, itanks]);

  return { totalTvl };
};

export default useMineTotalTvl;
