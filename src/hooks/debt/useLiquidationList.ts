//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";
import useDebts from "./useDebts";
const useLiquidationList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMortgageValue, setTotalMortgageValue] = useState(0);

  const debts = useDebts();
  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchList = useCallback(
    async (address = basisCash?.myAccount) => {
      if (debts.length) {
        const userList = await basisCash.getDebtUserList();
        let list = await Promise.all(
          debts.map(async (item) => {
         
            const datum = await Promise.all(
              userList.map(async (el) => {
                const info = await basisCash.getDebt(
                  item.mortgagePoolContract,
                  item.mortgageToken,
                  el.address,
                  item.uToken,
                  item.key
                );
                return info;
              })
            );

            return { ...item, datum };
          })
        );
        // list = list.filter((el) => !!el.created);
        // let totalMortgageValue = new BigNumber(0);

        // list.forEach((item) => {
        //   totalMortgageValue = totalMortgageValue.plus(item.mortgageValue);

        // });
        // setTotalMortgageValue(totalMortgageValue.toNumber());

        console.log("🚀 ~ file: useLiquidationList.ts ~ line 52 ~ list", list);
        setList(debts);
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

  return { list, loading, totalMortgageValue };
};

export default useLiquidationList;
