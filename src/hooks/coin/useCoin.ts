import { useCallback } from "react";

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
        mortgageToken.symbol === "ETH" ? String(amount + 0.01) : String(amount),
        mortgageToken.decimal
      );
      // console.log(
      //   mortgagePoolContract,
      //   mortgageToken,
      //   amountBn,
      //   ratio * 100,
      //   value
      // );
      return handleTransactionReceipt(basisCash.coin, [
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        ratio * 100,
        value,
      ]);
    },
    [basisCash]
  );
  return { onCoin: handleCoin };
};

export default useCoin;
