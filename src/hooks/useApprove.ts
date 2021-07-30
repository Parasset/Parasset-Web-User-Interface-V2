//@ts-nocheck
import { ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import useAllowance from './useAllowance';

const APPROVE_AMOUNT = ethers.constants.MaxUint256;

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApprove(token: any, spender: string) {
  const currentAllowance = useAllowance(token, spender);
  const handleTransactionReceipt = useHandleTransactionReceipt();
  // check the current approval status
  const approvalState = useMemo(() => {
    return !currentAllowance;
    // return currentAllowance;
  }, [currentAllowance]);

  const approve = useCallback(async () => {
    if (!approvalState) {
      console.error('approve was called unnecessarily');
      return;
    }
    try {
    
      return handleTransactionReceipt(token.approve, [spender, APPROVE_AMOUNT], token);
    } catch (error) {
      console.log("🚀 ~ file: useApprove.ts ~ line 27 ~ approve ~ error", error)
      return '0';
    }
  }, [approvalState, token, spender]);

  return [approvalState, approve];
}

export default useApprove;
