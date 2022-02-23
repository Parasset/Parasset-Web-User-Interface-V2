//@ts-nocheck
import { useCallback } from "react";
import BigNumber from "bignumber.js";
import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";
const useLiquidation = () => {
  const parasset = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleLiquidation = useCallback(
    (mortgagePoolContract, mortgageToken, amount, account) => {
      const amountBn = decimalToBalance(String(amount), mortgageToken.decimal);
      const value = decimalToBalance(String(0.01), mortgageToken.decimal);

      return handleTransactionReceipt(parasset.liquidation, [
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        account,
        value,
      ]);
    },
    [parasset]
  );
  return { onLiquidation: handleLiquidation };
};

export default useLiquidation;
