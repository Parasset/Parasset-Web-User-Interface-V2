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

  const parasset = useParasset();
  const block = useBlockNumber();

  const fetchTvlDatum = useCallback(async () => {
    const tvlDatum = await parasset.getCoinTvlDatum(tvlDatumValue);
    setTvlDatum(tvlDatum);
  }, [parasset, tvlDatumValue]);

  const fetchDebtDatum = useCallback(async () => {
    const debtDatum = await parasset.getDebtDatum(debtDatumValue);
    setDebtDatum(debtDatum);
  }, [parasset, debtDatumValue]);

  useEffect(() => {
    if (parasset) {
      fetchTvlDatum();
      fetchDebtDatum();
    }
  }, [parasset, block, tvlDatumValue, debtDatumValue]);

  return {
    tvlDatum,
    debtDatum,

    fetchTvlDatum,
    fetchDebtDatum,
  };
};

export default useCoinDatum;
