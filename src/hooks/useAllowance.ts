import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';
import ERC20 from '../basis-cash/ERC20';
import config from '../config';
const useAllowance = (token: ERC20, spender: string, pendingApproval?: boolean) => {
  const [allowance, setAllowance] = useState<BigNumber>(null);
  const { account } = useWallet();

  const fetchAllowance = useCallback(async () => {
    const allowance = await token.allowance(account, spender);
    setAllowance(allowance);
  }, [account, spender, token]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (account && spender && token) {
        fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err.stack}`));
      }
    }, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [account, spender, token, pendingApproval]);

  return allowance;
};

export default useAllowance;
