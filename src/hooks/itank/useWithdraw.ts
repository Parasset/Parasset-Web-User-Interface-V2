

import { useCallback } from 'react';

import useBasisCash from '../useBasisCash';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
const useWithdraw = (itankContract: any) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount) => {
      const amountBn = parseUnits(amount, 18);
      return handleTransactionReceipt(basisCash.unstake, [ itankContract,
        amountBn,]);
    },
    [basisCash,itankContract],
  );
  return { onWithdraw: handleWithdraw };
};


export default useWithdraw;

