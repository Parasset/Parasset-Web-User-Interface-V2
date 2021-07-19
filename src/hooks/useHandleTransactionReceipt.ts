//@ts-nocheck
import { useCallback } from "react";

import {
  useStatusModalToggle,
  useStatusToggle,
  useUpdateTransactionHash,
} from "./../state/application/hooks";

import useBasisCash from "./useBasisCash";
function useHandleTransactionReceipt() {
  const toggleWait = useStatusModalToggle();
  const updateTx = useUpdateTransactionHash();
  const toggleStatus = useStatusToggle();

  const basisCash = useBasisCash();
  return useCallback(
    async (func, arg = [], contextObj?: any) => {
      try {
        toggleStatus(1);
        toggleWait(true);
        const tx = await func.call(contextObj ? contextObj : basisCash, ...arg);
        toggleStatus(2);
        const status = await tx.wait();
        if (typeof status !== "string") {
          toggleStatus(3);
          updateTx(status.transactionHash);
          return status;
        } else {
          toggleStatus(4);
          return "0";
        }
      } catch (e) {
        console.log("🚀 ~ file: useHandleTransactionReceipt.ts ~ line 34 ~ e", e)
        toggleStatus(5);
        return "0";
      }
    },
    //
    [basisCash, toggleStatus, toggleWait]
  );
}

export default useHandleTransactionReceipt;
