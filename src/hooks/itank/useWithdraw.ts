import { useCallback } from "react";
import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";

const useWithdraw = (itankContract: any, decimal: any) => {
  const parasset = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount) => {
      const amountBn = decimalToBalance(amount, decimal);
      return handleTransactionReceipt(parasset.itankUnstake, [
        itankContract,
        amountBn,
      ]);
    },
    [parasset, itankContract, decimal]
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
