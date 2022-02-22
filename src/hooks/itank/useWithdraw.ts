import { useCallback } from "react";
import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";

const useWithdraw = (itankContract: any, decimal: any) => {
  const basisCash = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount) => {
      const amountBn = decimalToBalance(amount, decimal);
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
