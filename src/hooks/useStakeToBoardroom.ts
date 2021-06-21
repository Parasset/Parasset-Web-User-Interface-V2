import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation();
  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        basisCash.stakeShareToBoardroom(amount),
        t('diyagas', {
          label: amount,
        }),
      );
    },
    [basisCash],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
