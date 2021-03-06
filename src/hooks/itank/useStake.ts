//@ts-nocheck
import { useCallback } from "react";

import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";
const useStake = (itankContract: any, decimal: any) => {
  const parasset = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount, isPayETH) => {
      const amountBn = decimalToBalance(amount, decimal);
      const value = isPayETH
        ? { value: decimalToBalance(String(amount), 18) }
        : {};
      return handleTransactionReceipt(parasset.itankStake, [
        itankContract,
        amountBn,
        value,
      ]);
    },
    [parasset, itankContract, decimal]
  );
  return { onStake: handleStake };
};

export default useStake;
