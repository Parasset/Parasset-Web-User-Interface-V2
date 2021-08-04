//@ts-nocheck
import { useCallback } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useCoin = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleCoin = useCallback(
    (mortgagePoolContract, mortgageToken, amount, ratio) => {
      const amountBn = decimalToBalance(String(amount), mortgageToken.decimal);
      const value = decimalToBalance(
        mortgageToken.symbol === "ETH"
          ? new BigNumber(amount).plus(0.01).toFixed()
          : String(0.01),
        mortgageToken.decimal
      );
     
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
