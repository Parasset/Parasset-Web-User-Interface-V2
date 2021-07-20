import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { parseUnits } from "ethers/lib/utils";
const useWithdraw = (itankContract: any, decimal: any) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount) => {
      const amountBn = parseUnits(amount, decimal);
      return handleTransactionReceipt(basisCash.itankUnstake, [
        itankContract,
        amountBn,
      ]);
    },
    [basisCash, itankContract, decimal]
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
