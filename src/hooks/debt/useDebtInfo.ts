//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";

const useDebtInfo = (debt) => {
  const [info, setInfo] = useState({});

  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchInfo = useCallback(
    async (address = basisCash?.myAccount) => {
      const info = await basisCash.getDebt(
        debt.mortgagePoolContract,
        debt.mortgageToken,
        address,
        debt.uToken,
        debt.key
      );
      setInfo({ ...debt, ...info });
    },
    [basisCash?.myAccount, debt]
  );

  useEffect(() => {
    if (basisCash?.myAccount && debt && debt.mortgagePoolContract) {
      fetchInfo();
    }
  }, [basisCash?.myAccount, debt, block]);

  return { info };
};

export default useDebtInfo;
