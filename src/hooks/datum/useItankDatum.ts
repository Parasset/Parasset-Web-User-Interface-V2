//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";

const useItankDatum = ({ tvlDatumValue }) => {
  const [tvlDatum, setTvlDatum] = useState([]);

  const basisCash = useBasisCash();
  const block = useBlockNumber();

  const fetchTvlDatum = useCallback(async () => {
    const tvlDatum = await basisCash.getItankTvlDatum(tvlDatumValue);
    setTvlDatum(tvlDatum);
  }, [basisCash, tvlDatumValue]);

  useEffect(() => {
    if (basisCash) {
      fetchTvlDatum();
    }
  }, [basisCash, block, tvlDatumValue]);

  return { tvlDatum, fetchTvlDatum };
};

export default useItankDatum;
