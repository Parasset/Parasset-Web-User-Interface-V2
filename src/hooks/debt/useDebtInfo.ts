//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";

const useDebtInfo = (debt) => {
  const [info, setInfo] = useState({});

  const parasset = useParasset();
  const block = useBlockNumber();
  const fetchInfo = useCallback(
    async (address = parasset?.myAccount) => {
      const info = await parasset.getDebt(
        debt.mortgagePoolContract,
        debt.mortgageToken,
        address,
        debt.uToken,
        debt.key
      );
      setInfo({ ...debt, ...info });
      if (debt.mortgageToken.symbol === 'HBTC') {
        console.log(info)
      }
    },

    [parasset?.myAccount, debt]
  );

  useEffect(() => {
    let refreshInterval = true;
    if (
      parasset?.myAccount &&
      debt &&
      debt.mortgagePoolContract &&
      refreshInterval
    ) {
      fetchInfo();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, debt, block]);

  return { info, fetchInfo };
};

export default useDebtInfo;
