import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { parseUnits } from "ethers/lib/utils";
const useStake = (address:any) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount) => {
      const amountBn = parseUnits(amount, 18);
      console.log(amountBn, amount);
      return handleTransactionReceipt(basisCash.stake, [amountBn, address]);
    },
    [basisCash, address]
  );
  return { onStake: handleStake };
};

export default useStake;
