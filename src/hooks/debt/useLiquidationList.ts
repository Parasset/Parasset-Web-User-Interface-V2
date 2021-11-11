//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import { getNumberToFixed } from "../../utils/formatBalance";
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
        // mortgageAssets mortgageValue
        list = list.map((item) => {
          let totalRate = new BigNumber(0);
          let totalMortgageValue = new BigNumber(0);
          let totalMortgageAssets = new BigNumber(0);
          let totalParassetAssets = new BigNumber(0);
          let totalParassetValue = new BigNumber(0);
          item.datum.forEach((el) => {
            totalRate = totalRate.plus(el.rate);
            totalMortgageAssets = totalMortgageAssets.plus(el.mortgageAssets);
            totalMortgageValue = totalMortgageValue.plus(el.mortgageValue);
            totalParassetAssets = totalParassetAssets.plus(el.parassetAssets);
            totalParassetValue = totalParassetValue.plus(el.parassetValue);
          });
          const mortgagePrice = new BigNumber(item.datum[0]?.mortgagePrice);
          const maxLiqFee = mortgagePrice.times(totalMortgageAssets).times(0.9);
          return {
            ...item,
            totalRate: getNumberToFixed(totalRate),
            totalMortgageValue: getNumberToFixed(totalMortgageValue),
            totalMortgageAssets: getNumberToFixed(totalMortgageAssets),
            totalParassetAssets: getNumberToFixed(totalParassetAssets),
            totalParassetValue: getNumberToFixed(totalParassetValue),
            maxLiqFee: getNumberToFixed(maxLiqFee),
          };
        });

        console.log("🚀 ~ file: useLiquidationList.ts ~ line 52 ~ list", list);
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

  return { list, loading, totalMortgageValue };
};

export default useLiquidationList;
