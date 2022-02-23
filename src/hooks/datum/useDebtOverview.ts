//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";

const useDebtOverview = () => {
  const [debtOverview, setDebtOverview] = useState({
    rate: 0,
    count: 0,
  });

  const parasset = useParasset();
  const block = useBlockNumber();
  const fetchDebtOverview = useCallback(async () => {
    const debtOverview = await parasset.getDebtOverview();
    setDebtOverview(debtOverview);
  }, [parasset]);

  useEffect(() => {
    if (parasset) {
      fetchDebtOverview();
    }
  }, [parasset, block]);

  return { debtOverview, fetchDebtOverview };
};

export default useDebtOverview;
