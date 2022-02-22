//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "../../state/application/hooks";
import useParasset from "../useParasset";
import { getToNumber } from "../../utils/formatBalance";
const useLiquidatedAssets = () => {
  const [liquidatedAssets, setLiquidatedAssets] = useState(0);
  const basisCash = useParasset();

  const fetchLiquidatedAssets = useCallback(async () => {
    const liquidatedAssets = await basisCash.getLiquidatedAssets();
    setLiquidatedAssets(liquidatedAssets);
  }, [basisCash]);

  useEffect(() => {
    let refreshInterval = true;
    if (refreshInterval && basisCash) {
      fetchLiquidatedAssets();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash]);

  return liquidatedAssets;
};

export default useLiquidatedAssets;
