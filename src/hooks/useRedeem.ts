import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation();
  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(
      basisCash.exit(bank.contract),
      t('shuihuim', {
        label: bank.contract,
      }),
    );
  }, [bank, basisCash]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
