import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useExchange = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleExchange = useCallback(
    (itankContract, amount, decimal, isTransform,isPayETH) => {
      
      try {
        const value=isPayETH?{value: decimalToBalance(String(parseFloat(amount)), 18)}:{}
        const amountBn = decimalToBalance(String(amount), decimal);
        return handleTransactionReceipt(
          !isTransform
            ? basisCash.exchangeUnderlyingToPToken
            : basisCash.exchangePTokenToUnderlying,
          [itankContract, amountBn,value]
        );
      } catch (error) {
        console.log(
          "🚀 ~ file: useExchange.ts ~ line 21 ~ useExchange ~ error",
          // decimalToBalance(amount, decimal),
          amount,
          error
        );
      }
    },
    [basisCash]
  );
  return { onExchange: handleExchange };
};

export default useExchange;
