//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";
import useDebts from "./useDebts";
const useCreatedDebts = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mortgageValue, setTotalMortgageValue] = useState(0);
  const [parassetValue, setTotalParassetValue] = useState(0);
  const debts = useDebts();
  const parasset = useParasset();
  const block = useBlockNumber();
  const fetchList = useCallback(
    async (address = parasset?.myAccount) => {
      if (debts.length) {
        let list = await Promise.all(
          debts.map(async (item) => {
            const info = await parasset.getDebt(
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
        let mortgageValue = new BigNumber(0);
        let parassetValue = new BigNumber(0);
        list.forEach((item) => {
          mortgageValue = mortgageValue.plus(item.mortgageValue);
          parassetValue = parassetValue
            .plus(item.parassetValue)
            .plus(item.feeValue);
        });
        setTotalMortgageValue(mortgageValue.toNumber());
        setTotalParassetValue(parassetValue.toNumber());
        setList(list);
        setLoading(false);
        return list;
      }
    },
    [parasset?.myAccount, debts]
  );

  useEffect(() => {
    let refreshInterval = true;
    if (parasset?.myAccount && refreshInterval) {
      fetchList();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, debts, block]);

  return { list, loading, mortgageValue, parassetValue };
};

export default useCreatedDebts;
