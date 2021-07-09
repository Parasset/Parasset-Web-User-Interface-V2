//@ts-nocheck
import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Mine } from '../basis-cash';
import { useTranslation } from 'react-i18next'
const useHarvest = (mine: Mine) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation()
  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      basisCash.harvest(mine.contract),
      t('shengming',{
        label:mine.earnTokenName,
        label1:mine.contract,
      }),
    );
  }, [mine, basisCash]);

  return { onReward: handleReward };
};

export default useHarvest;
