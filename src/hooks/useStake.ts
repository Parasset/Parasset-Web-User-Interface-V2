import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useStake = (bank: Bank) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { t } = useTranslation();
  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        basisCash.stake(bank.contract, amountBn,bank),
        t('diyamou', {
          label: amount,
          label1: bank.depositTokenName,
          label2: bank.contract,
        }),
      );
    },
    [bank, basisCash],
  );
  return { onStake: handleStake };
};

export default useStake;
