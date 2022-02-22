//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "./useParasset";
import config from "../config";
const useAvgPrice = () => {
  const [avgPrice, setAvgPrice] = useState(0);
  const basisCash = useParasset();

  const fetchAvgPrice = useCallback(async () => {
    setAvgPrice(await basisCash.getAvgPrice());
  }, [basisCash]);

  useEffect(() => {
    if (basisCash?.myAccount) {
      fetchAvgPrice().catch((err) =>
        console.error(`Failed to fetch avgPrice: ${err.stack}`)
      );
      let refreshInterval = setInterval(fetchAvgPrice, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [basisCash?.myAccount]);

  return avgPrice;
};

export default useAvgPrice;
