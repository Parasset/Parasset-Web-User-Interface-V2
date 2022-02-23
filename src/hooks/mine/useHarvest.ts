//@ts-nocheck
import { useCallback } from "react";

import useParasset from "../useParasset";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";

const useHarvest = (address) => {
  const parasset = useParasset();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    return handleTransactionReceipt(parasset.harvest, [address]);
  }, [parasset, address]);
  return { onReward: handleReward };
};

export default useHarvest;
