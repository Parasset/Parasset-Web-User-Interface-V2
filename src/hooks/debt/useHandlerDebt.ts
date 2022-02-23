//@ts-nocheck
import { useCallback } from "react";
import BigNumber from "bignumber.js";
import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";

const useHandlerDebt = () => {
  const parasset = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handlerDebt = useCallback(
    (mortgagePoolContract, mortgageToken, amount, select) => {
      const amountBn = decimalToBalance(String(amount), mortgageToken.decimal);
      const value = decimalToBalance(
        mortgageToken.symbol === "ETH" && select === "Stake"
          ? new BigNumber(amount).plus(0.001).toFixed()
          : String(0.001),
        mortgageToken.decimal
      );

      return handleTransactionReceipt(parasset.handlerDebt, [
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        select,
        value,
      ]);
    },
    [parasset]
  );
  return { onHandlerDebt: handlerDebt };
};

export default useHandlerDebt;
