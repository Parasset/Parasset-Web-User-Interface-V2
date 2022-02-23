//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";
const usePrice = () => {
  const block = useBlockNumber();
  const [NESTToUSDTPrice, setNESTToUSDTPrice] = useState(0);
  const [NESTToETHPrice, setNESTToETHPrice] = useState(0);
  const [ETHAvgPrice, setETHAvgPrice] = useState(0);
  const parasset = useParasset();

  const fetchETHAvgPrice = useCallback(async () => {
    setETHAvgPrice(await parasset.getAvgPrice());
  }, [parasset]);

  const fetchNESTToUSDTPrice = useCallback(async () => {
    setNESTToUSDTPrice(await parasset.getNESTToUSDTPrice());
  }, [parasset]);

  const fetchNESTToETHPrice = useCallback(async () => {
    setNESTToETHPrice(await parasset.getNESTToETHPrice());
  }, [parasset]);

  const fetchInfo = useCallback(async () => {
    fetchETHAvgPrice();
    fetchNESTToUSDTPrice();
    fetchNESTToETHPrice();
  }, [parasset?.myAccount]);

  useEffect(() => {
    let refreshInterval = true;
    if (parasset?.myAccount && refreshInterval) {
      fetchInfo();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, block]);
  return { NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice };
};

export default usePrice;
