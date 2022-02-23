//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "../../state/application/hooks";
import useParasset from "../useParasset";
import { getToNumber } from "../../utils/formatBalance";
const useLiquidatedAssets = () => {
  const [liquidatedAssets, setLiquidatedAssets] = useState(0);
  const parasset = useParasset();

  const fetchLiquidatedAssets = useCallback(async () => {
    const liquidatedAssets = await parasset.getLiquidatedAssets();
    setLiquidatedAssets(liquidatedAssets);
  }, [parasset]);

  useEffect(() => {
    let refreshInterval = true;
    if (refreshInterval && parasset) {
      fetchLiquidatedAssets();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset]);

  return liquidatedAssets;
};

export default useLiquidatedAssets;
