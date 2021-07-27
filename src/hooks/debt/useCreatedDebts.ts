//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";
import useDebts from "./useDebts";
const useCreatedDebts = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMortgageValue, setTotalMortgageValue] = useState(0);
  const [totalParassetValue, setTotalParassetValue] = useState(0);
  const debts = useDebts();
  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchList = useCallback(
    async (address = basisCash?.myAccount) => {
      if (debts.length) {
        let list = await Promise.all(
          debts.map(async (item) => {
            const info = await basisCash.getDebt(
              item.mortgagePoolContract,
              item.mortgageToken,
              address,
              item.uToken,
              item.key
            );
            return { ...item, ...info };
          })
        );
        list = list.filter((el) => !!el.created);
        let totalMortgageValue = new BigNumber(0);
        let totalParassetValue = new BigNumber(0);
        list.forEach((item) => {
          totalMortgageValue = totalMortgageValue.plus(item.mortgageValue);
          totalParassetValue = totalParassetValue
            .plus(item.parassetValue)
            .plus(item.feeValue);
        });
        setTotalMortgageValue(totalMortgageValue.toNumber());
        setTotalParassetValue(totalParassetValue.toNumber());
        setList(list);
        setLoading(false);
        return list;
      }
    },
    [basisCash?.myAccount, debts]
  );

  useEffect(() => {
    let refreshInterval = true;
    if (basisCash?.myAccount && refreshInterval) {
      fetchList();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, debts, block]);

  return { list, loading, totalMortgageValue, totalParassetValue };
};

export default useCreatedDebts;
