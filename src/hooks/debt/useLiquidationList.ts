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
  const [totalMortgageAssets, setTotalMortgageAssets] = useState(0);

  const debts = useDebts();
  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchList = useCallback(
    async (address = basisCash?.myAccount) => {
      if (debts.length) {
        const userList = await basisCash.getDebtUserList();
        let list = [];
        await Promise.all(
          debts.map(async (item) => {
            const datum = await Promise.all(
              userList.map(async (el) => {
                const account = el.address;
                const info = await basisCash.getDebt(
                  item.mortgagePoolContract,
                  item.mortgageToken,
                  account,
                  item.uToken,
                  item.key
                );
                const { rate, liqRatio } = info;

                const mortgagePrice = new BigNumber(info?.mortgagePrice);
                const isLiq = new BigNumber(rate).div(100).gte(liqRatio);

                const maxLiqFee = mortgagePrice
                  .times(info.mortgageAssets)
                  .times(0.9)
                  .toNumber();
                return {
                  ...item,
                  ...info,
                  account,
                  maxLiqFee,
                  itemKey: item.key + account,
                  isLiq,
                };
              })
            );
            list.push(...datum);
          })
        );
        //  new BigNumber(liqRatio)rate
        list = list.filter((el) => !!el.created);
        list = list.filter((el) => el.isLiq);
        let totalMortgageAssets = new BigNumber(0);
        list.forEach((item) => {
          totalMortgageAssets = totalMortgageAssets.plus(item.mortgageAssets);
        });
        setTotalMortgageAssets(getNumberToFixed(totalMortgageAssets));
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

  return { list, loading, totalMortgageAssets };
};

export default useLiquidationList;
