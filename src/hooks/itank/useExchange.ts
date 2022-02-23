import { useCallback } from "react";
import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";

const useExchange = () => {
  const parasset = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleExchange = useCallback(
    (itankContract, amount, decimal, isTransform, isPayETH) => {
      try {
        const value = isPayETH
          ? { value: decimalToBalance(String(amount), 18) }
          : {};
        const amountBn = decimalToBalance(String(amount), decimal);
        console.log(amount, amountBn, value);
        return handleTransactionReceipt(
          !isTransform
            ? parasset.exchangeUnderlyingToPToken
            : parasset.exchangePTokenToUnderlying,
          [itankContract, amountBn, value]
        );
      } catch (error) {
        console.log(
          "🚀 ~ file: useExchange.ts ~ line 21 ~ useExchange ~ error",
          amount,
          decimal,
          error
        );
      }
    },
    [parasset]
  );
  return { onExchange: handleExchange };
};

export default useExchange;
