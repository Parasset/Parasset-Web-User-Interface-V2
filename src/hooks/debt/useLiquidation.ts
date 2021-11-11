//@ts-nocheck
import { useCallback } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useLiquidation = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleLiquidation = useCallback(
    (mortgagePoolContract, mortgageToken, amount, ) => {
      const amountBn = decimalToBalance(String(amount), mortgageToken.decimal);
      const value = decimalToBalance(
        mortgageToken.symbol === "ETH"
          ? new BigNumber(amount).plus(0.001).toFixed()
          : String(0.001),
        mortgageToken.decimal
      );
     
      return handleTransactionReceipt(basisCash.liquidation, [
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        value,
      ]);
    },
    [basisCash]
  );
  return { onLiquidation: handleLiquidation };
};

export default useLiquidation;
