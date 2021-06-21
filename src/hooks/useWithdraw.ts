import { useCallback } from 'react';
import { useTranslation } from 'react-i18next'
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useWithdraw = (bank: Bank) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation()
  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        basisCash.unstake(bank.contract, amountBn),
        t('tixianc', {
          label: amount,
          label1: bank.depositTokenName,
          label2: bank.contract,
        }),
      );
    },
    [bank, basisCash],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
