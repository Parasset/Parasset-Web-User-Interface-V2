//@ts-nocheck
import { useCallback } from "react";
import BigNumber from "bignumber.js";
import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";
const useCoin = () => {
  const basisCash = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleCoin = useCallback(
    (mortgagePoolContract, mortgageToken, amount, ratio) => {
      const amountBn = decimalToBalance(String(amount), mortgageToken.decimal);
      const value = decimalToBalance(
        mortgageToken.symbol === "ETH"
          ? new BigNumber(amount).plus( process.env.NODE_ENV === 'development' ? 0.01 : 0.001).toFixed()
          : String(process.env.NODE_ENV === 'development' ? 0.01 : 0.001),
        mortgageToken.decimal
      );
      ratio = new BigNumber(ratio).times(100000).toFixed(0, 1);
      return handleTransactionReceipt(basisCash.coin, [
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        Number(ratio),
        value,
      ]);
    },
    [basisCash]
  );
  return { onCoin: handleCoin };
};

export default useCoin;
