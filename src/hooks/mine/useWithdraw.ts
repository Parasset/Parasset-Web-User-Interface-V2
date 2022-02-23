import { useCallback } from "react";

import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";
const useWithdraw = (address: any) => {
  const parasset = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount) => {
      const amountBn = decimalToBalance(amount, 18);
      return handleTransactionReceipt(parasset.unstake, [amountBn, address]);
    },
    [parasset, address]
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
