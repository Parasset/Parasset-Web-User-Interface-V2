import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { parseUnits } from "ethers/lib/utils";
const useCoin = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleCoin = useCallback(
    (mortgagePoolContract, mortgageToken, amount, ratio) => {
      const amountBn = parseUnits(String(amount), mortgageToken.decimal);
      const value = parseUnits(
        mortgageToken.symbol === "ETH" ? String(amount + 0.01) : String(amount),
        mortgageToken.decimal
      );
      console.log(
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        ratio * 100,
        value
      );
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
