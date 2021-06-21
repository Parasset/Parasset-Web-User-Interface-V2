import { useCallback } from 'react';
import { useTranslation } from 'react-i18next'
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation()
  const handleReward = useCallback(() => {
    handleTransactionReceipt(basisCash.harvestCashFromBoardroom(),  t('smchys'));
  }, [basisCash]);

  return { onReward: handleReward };
};

export default useHarvestFromBoardroom;
