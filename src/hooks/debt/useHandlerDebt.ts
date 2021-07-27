//@ts-nocheck
import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useHandlerDebt = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handlerDebt = useCallback(
    (mortgagePoolContract, mortgageToken, amount, select) => {
      const amountBn = decimalToBalance(String(amount), mortgageToken.decimal);
      const value = decimalToBalance(
        mortgageToken.symbol === "ETH" && select === "Stake"
          ? String(amount + 0.01)
          : String(0.01),
        mortgageToken.decimal
      );

      return handleTransactionReceipt(basisCash.handlerDebt, [
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        select,
        value,
      ]);
    },
    [basisCash]
  );
  return { onHandlerDebt: handlerDebt };
};

export default useHandlerDebt;
