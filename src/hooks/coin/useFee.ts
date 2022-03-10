//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";
const useFee = (mortgagePoolContract, mortgageToken, uToken) => {
  const block = useBlockNumber();
  const [fee, setFee] = useState(0);
  const parasset = useParasset();

  const fetchFee = useCallback(
    async (address = parasset?.myAccount) => {
      const fee = await parasset.getStableFee(
        mortgagePoolContract,
        mortgageToken,
        uToken,
        address
      );
      setFee(fee);
    },
    [parasset?.myAccount, mortgageToken, uToken]
  );

  useEffect(() => {
    let refreshInterval = true;
    if (
      parasset?.myAccount &&
      mortgagePoolContract &&
      mortgageToken &&
      uToken &&
      refreshInterval
    ) {
      fetchFee();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, block, mortgagePoolContract, mortgageToken, uToken]);
  return fee;
};

export default useFee;
