import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useStake = (itankContract: any, decimal: any) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount) => {
      const amountBn = decimalToBalance(amount, decimal);
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
