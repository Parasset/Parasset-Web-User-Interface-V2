//@ts-nocheck
import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../basis-cash';
import { useTranslation } from 'react-i18next'
const useHarvest = (bank: Bank) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation()
  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      basisCash.harvest(bank.contract),
      t('shengming',{
        label:bank.earnTokenName,
        label1:bank.contract,
      }),
    );
  }, [bank, basisCash]);

  return { onReward: handleReward };
};

export default useHarvest;
