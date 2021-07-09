import { useCallback } from 'react'

import useBasisCash from './useBasisCash'
import useHandleTransactionReceipt from './useHandleTransactionReceipt'
import { parseUnits } from 'ethers/lib/utils'
const useStake = (poolName: any, pid: number) => {
  const basisCash = useBasisCash()
  const handleTransactionReceipt = useHandleTransactionReceipt()

  const handleStake = useCallback(
    amount => {
      const amountBn = parseUnits(amount, 18)
      console.log(amountBn, amount)
      return handleTransactionReceipt(basisCash.stake, [amountBn, poolName,pid, ])
    },
    [basisCash, poolName, pid]
  )
  return { onStake: handleStake }
}

export default useStake
