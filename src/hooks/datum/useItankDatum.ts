//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";

const useItankDatum = ({
  tvlDatumValue,
  feeDatumValue,
  netValueDatumValue,
}) => {
  const [tvlDatum, setTvlDatum] = useState([]);
  const [feeDatum, setFeeDatum] = useState([]);
  const [netValueDatum, setNetValueDatum] = useState([]);

  const parasset = useParasset();
  const block = useBlockNumber();

  const fetchTvlDatum = useCallback(async () => {
    const tvlDatum = await parasset.getItankTvlDatum(tvlDatumValue);
    setTvlDatum(tvlDatum);
  }, [parasset, tvlDatumValue]);

  const fetchFeeDatum = useCallback(async () => {
    const feeDatum = await parasset.getItankFeeDatum(feeDatumValue);
    setFeeDatum(feeDatum);
  }, [parasset, feeDatumValue]);

  const fetchNetValueDatum = useCallback(async () => {
    const netValueDatum = await parasset.getItankNetValueDatum(
      netValueDatumValue
    );
    setNetValueDatum(netValueDatum);
  }, [parasset, netValueDatumValue]);

  useEffect(() => {
    if (parasset) {
      fetchTvlDatum();
      fetchFeeDatum();
      fetchNetValueDatum();
    }
  }, [parasset, block, tvlDatumValue, feeDatumValue, netValueDatumValue]);

  return {
    tvlDatum,
    feeDatum,
    netValueDatum,
    fetchTvlDatum,
    fetchFeeDatum,
    fetchNetValueDatum,
  };
};

export default useItankDatum;
