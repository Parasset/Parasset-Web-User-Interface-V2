import { useCallback } from "react";
import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";

const useStake = (address: any) => {
  const basisCash = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount) => {
      const amountBn = decimalToBalance(amount, 18);
      console.log(amountBn, amount);
      return handleTransactionReceipt(basisCash.stake, [amountBn, address]);
    },
    [basisCash, address]
  );
  return { onStake: handleStake };
};

export default useStake;
