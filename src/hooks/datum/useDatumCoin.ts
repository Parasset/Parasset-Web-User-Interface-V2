//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";

const useDatumCoin = () => {
  const [coinData, setCoinData] = useState({});

  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchCoinData = useCallback(
    async (address = basisCash?.myAccount) => {
      setTimeout(() => {
        setCoinData({
          title: {
            text: "抵押资产分布",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: [
                { value: 1048, name: "ETH" },
                { value: 735, name: "USDT" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        });
      }, 100);
    },
    [basisCash?.myAccount]
  );

  useEffect(() => {
    if (basisCash?.myAccount) {
      fetchCoinData();
    }
  }, [basisCash?.myAccount, block]);

  return { coinData, fetchCoinData };
};

export default useDatumCoin;
