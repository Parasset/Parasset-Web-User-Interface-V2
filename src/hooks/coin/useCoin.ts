//@ts-nocheck
import { useCallback } from "react";
import BigNumber from "bignumber.js";
import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../abi/ether-utils";
const useCoin = () => {
  const parasset = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleCoin = useCallback(
    (mortgagePoolContract, mortgageToken, getToken, amount, ratio) => {
      const amountBn = decimalToBalance(String(amount), mortgageToken.decimal);
      const value = decimalToBalance(
        mortgageToken.symbol === "ETH"
          ? new BigNumber(amount)
              .toFixed()
          : String(0),
        mortgageToken.decimal
      );
      ratio = new BigNumber(ratio).times(100000).toFixed(0, 1);
      return handleTransactionReceipt(parasset.coin, [
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        Number(ratio),
        value,
      ]);
    },
    [parasset]
  );
  return { onCoin: handleCoin };
};

export default useCoin;
