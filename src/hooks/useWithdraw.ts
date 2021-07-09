import { useCallback } from 'react';
import { useTranslation } from 'react-i18next'
import useBasisCash from './useBasisCash';
import { Mine } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useWithdraw = (mine: Mine) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation()
  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, mine.depositToken.decimal);
      handleTransactionReceipt(
        basisCash.unstake(mine.contract, amountBn),
        t('tixianc', {
          label: amount,
          label1: mine.depositTokenName,
          label2: mine.contract,
        }),
      );
    },
    [mine, basisCash],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
