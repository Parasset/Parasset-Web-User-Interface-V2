//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";
const useMaxRatio = (mortgagePoolContract, mortgageToken) => {
  const block = useBlockNumber();
  const [maxRatio, setMaxRatio] = useState(0);
  const parasset = useParasset();

  const fetchMaxRatio = useCallback(async () => {
    setMaxRatio(
      await parasset.getMaxRatio(mortgagePoolContract, mortgageToken)
    );
  }, [parasset, mortgageToken]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      parasset?.myAccount &&
      mortgagePoolContract &&
      mortgageToken &&
      refreshInterval
    ) {
      fetchMaxRatio();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, block, mortgagePoolContract, mortgageToken]);
  return maxRatio;
};

export default useMaxRatio;
