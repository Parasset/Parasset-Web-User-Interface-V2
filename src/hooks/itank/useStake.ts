import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { parseUnits } from "ethers/lib/utils";
const useStake = (itankContract: any, decimal: any) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount) => {
      const amountBn = parseUnits(amount, decimal);
      console.log(amountBn, amount);
      return handleTransactionReceipt(basisCash.itankStake, [
        itankContract,
        amountBn,
      ]);
    },
    [basisCash, itankContract, decimal]
  );
  return { onStake: handleStake };
};

export default useStake;
