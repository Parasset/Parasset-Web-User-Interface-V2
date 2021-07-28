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
        mortgageToken.symbol === "ETH" ? String(amount + 0.01) : String(0.01),
        mortgageToken.decimal
      );
      ratio = new BigNumber(ratio).times(100000).toFixed(3,1);
      // console.log(ratio,Number(ratio) );
      return handleTransactionReceipt(basisCash.coin, [
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        // parseInt(ratio),
       Number(ratio) ,
        value,
      ]);
    },
    [basisCash]
  );
  return { onCoin: handleCoin };
};

export default useCoin;
