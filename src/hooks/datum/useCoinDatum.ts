//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";

const useCoinDatum = ({ tvlDatumValue, debtDatumValue }) => {
  const [tvlDatum, setTvlDatum] = useState({
    insTvlDatum: [],
    morTvlDatum: [],
  });
  const [debtDatum, setDebtDatum] = useState({
    avgRateDatum: [],
    debtDatum: [],
  });

  const basisCash = useParasset();
  const block = useBlockNumber();

  const fetchTvlDatum = useCallback(async () => {
    const tvlDatum = await basisCash.getCoinTvlDatum(tvlDatumValue);
    setTvlDatum(tvlDatum);
  }, [basisCash, tvlDatumValue]);

  const fetchDebtDatum = useCallback(async () => {
    const debtDatum = await basisCash.getDebtDatum(debtDatumValue);
    setDebtDatum(debtDatum);
  }, [basisCash, debtDatumValue]);

  useEffect(() => {
    if (basisCash) {
      fetchTvlDatum();
      fetchDebtDatum();
    }
  }, [basisCash, block, tvlDatumValue, debtDatumValue]);

  return {
    tvlDatum,
    debtDatum,

    fetchTvlDatum,
    fetchDebtDatum,
  };
};

export default useCoinDatum;
