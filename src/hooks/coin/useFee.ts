//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";
const useFee = (mortgagePoolContract, mortgageToken, uToken) => {
  const block = useBlockNumber();
  const [fee, setFee] = useState(0);
  const basisCash = useBasisCash();

  const fetchFee = useCallback(
    async (address = basisCash?.myAccount) => {
      setFee(
        await basisCash.getStableFee(
          mortgagePoolContract,
          mortgageToken,
          uToken,
          address
        )
      );
    },
    [basisCash?.myAccount, mortgageToken, uToken]
  );

  useEffect(() => {
    if (
      basisCash?.myAccount &&
      mortgagePoolContract &&
      mortgageToken &&
      uToken
    ) {
      fetchFee();
    }
  }, [
    basisCash?.myAccount,
    block,
    mortgagePoolContract,
    mortgageToken,
    uToken,
  ]);
  return fee;
};

export default useFee;
