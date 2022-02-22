//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";

const useDebtOverview = () => {
  const [debtOverview, setDebtOverview] = useState({
    rate: 0,
    count: 0,
  });

  const basisCash = useParasset();
  const block = useBlockNumber();
  const fetchDebtOverview = useCallback(async () => {
    const debtOverview = await basisCash.getDebtOverview();
    setDebtOverview(debtOverview);
    console.log(
      "🚀 ~ file: useDebtOverview.ts ~ line 13 ~ fetchDebtOverview ~ debtOverview",
      debtOverview
    );
  }, [basisCash]);

  useEffect(() => {
    if (basisCash) {
      fetchDebtOverview();
    }
  }, [basisCash, block]);

  return { debtOverview, fetchDebtOverview };
};

export default useDebtOverview;
