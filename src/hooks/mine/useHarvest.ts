//@ts-nocheck
import { useCallback } from "react";

import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";

const useHarvest = (address) => {
  const basisCash = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    return handleTransactionReceipt(basisCash.harvest, [address]);
  }, [basisCash, address]);
  return { onReward: handleReward };
};

export default useHarvest;
