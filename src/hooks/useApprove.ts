//@ts-nocheck
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useCallback, useMemo } from "react";
import useHandleTransactionReceipt from "./useHandleTransactionReceipt";
import useAllowance from "./useAllowance";
import { $isFiniteNumber, $isPositiveNumber } from "../utils/utils";
const APPROVE_AMOUNT = ethers.constants.MaxUint256;

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApprove(token: any, spender: string, amount) {
  const currentAllowance = useAllowance(token, spender);
  const handleTransactionReceipt = useHandleTransactionReceipt();
  // check the current approval status
  // const approvalState = useMemo(() => {
  //   return !parseFloat(currentAllowance);
  // }, [currentAllowance]);

  const approvalState = useMemo(() => {
    const approvalAmount = new BigNumber(currentAllowance);
    const payAmount = $isPositiveNumber($isFiniteNumber(amount));
    if (payAmount) {
      console.log(approvalAmount.toFixed(18,1),approvalAmount.gte(payAmount))
      return approvalAmount.gte(payAmount) ? false : true;
    } else if (!parseFloat(payAmount)) {
      return !parseFloat(currentAllowance);
    }
  }, [currentAllowance, amount]);

  // console.log(approvalState,token?.symbol,spender,amount)

  const approve = useCallback(async () => {
    if (!approvalState) {
      console.error("approve was called unnecessarily");
      return;
    }
    try {
      return handleTransactionReceipt(
        token.approve,
        [spender, APPROVE_AMOUNT],
        token
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: useApprove.ts ~ line 27 ~ approve ~ error",
        error
      );
      return "0";
    }
  }, [approvalState, token, spender]);

  return [approvalState, approve];
}

export default useApprove;
