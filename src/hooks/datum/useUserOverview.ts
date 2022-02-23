//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";

const useUserOverview = () => {
  const [userOverview, setUserOverview] = useState({
    total: 0,
    exchange: 0,
    coin: 0,
    ins: 0,
  });

  const basisCash = useParasset();
  const block = useBlockNumber();
  const fetchUserOverview = useCallback(async () => {
    const userOverview = await basisCash.getUserOverview();
    setUserOverview(userOverview);
  }, [basisCash]);

  useEffect(() => {
    if (basisCash) {
      fetchUserOverview();
    }
  }, [basisCash, block]);

  return { userOverview, fetchUserOverview };
};

export default useUserOverview;
