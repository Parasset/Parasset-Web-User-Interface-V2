//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";
const usePrice = () => {
  const block = useBlockNumber();
  const [NESTToUSDTPrice, setNESTToUSDTPrice] = useState(0);
  const [NESTToETHPrice, setNESTToETHPrice] = useState(0);
  const [NESTToBTCPrice, setNESTToBTCPrice] = useState(0);
  const [ETHToBTCPrice, setETHToBTCPrice] = useState(0);
  const [ETHToUSDTPrice, setETHToUSDTPrice] = useState(0);

  const parasset = useParasset();

  const fetchETHToUSDTPrice = useCallback(async () => {
    setETHToUSDTPrice(await parasset.getETHToUSDTPrice());
  }, [parasset]);

  const fetchNESTToUSDTPrice = useCallback(async () => {
    setNESTToUSDTPrice(await parasset.getNESTToUSDTPrice());
  }, [parasset]);

  const fetchNESTToETHPrice = useCallback(async () => {
    setNESTToETHPrice(await parasset.getNESTToETHPrice());
  }, [parasset]);

  const fetchNESTToBTCPrice = useCallback(async ()=> {
    setNESTToBTCPrice(await parasset.getNESTToBTCPrice())
  }, [parasset])

  const fetchETHToBTCPrice = useCallback(async ()=> {
    setETHToBTCPrice(await parasset.getETHToBTCPrice())
  }, [parasset])

  const fetchInfo = useCallback(async () => {
    fetchETHToUSDTPrice();
    fetchNESTToUSDTPrice();
    fetchNESTToETHPrice();
    fetchNESTToBTCPrice();
    fetchETHToBTCPrice();
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
  return { NESTToUSDTPrice, NESTToETHPrice, NESTToBTCPrice, ETHToUSDTPrice, ETHToBTCPrice};
};

export default usePrice;
