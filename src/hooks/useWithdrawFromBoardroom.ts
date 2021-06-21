//@ts-nocheck
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next'
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';

import { BigNumber } from 'ethers';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation()
  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        basisCash.withdrawShareFromBoardroom(amount),
        t('tixianchys', {
          label: amount,
         
        })
      );
    },
    [basisCash],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromBoardroom;
