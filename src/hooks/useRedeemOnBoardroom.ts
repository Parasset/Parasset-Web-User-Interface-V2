import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (description?: string) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation();
  const handleRedeem = useCallback(() => {
    const alertDesc = description || t('shuihuigasc');
    handleTransactionReceipt(basisCash.exitFromBoardroom(), alertDesc);
  }, [basisCash]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnBoardroom;
