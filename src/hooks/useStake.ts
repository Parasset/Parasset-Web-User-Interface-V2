import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useBasisCash from './useBasisCash';
import { Mine } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useStake = (mine: Mine) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation();
  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, mine.depositToken.decimal);
      handleTransactionReceipt(
        basisCash.stake(mine.contract, amountBn,mine),
        t('diyamou', {
          label: amount,
          label1: mine.depositTokenName,
          label2: mine.contract,
        }),
      );
    },
    [mine, basisCash],
  );
  return { onStake: handleStake };
};

export default useStake;
