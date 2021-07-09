//@ts-nocheck
import { createReducer,  } from '@reduxjs/toolkit'
import {
  updateBlockNumber,
  toggleStatusModal,
  updateTransactionHash,
  toggleStatus
} from './actions'


export interface ApplicationState {
  blockNumber: { [chainId: number]: number }
  walletModalOpen: boolean
}

const initialState: ApplicationState = {
  blockNumber: {},
  statusModalOpen: false,
  status: 1,
  transactionHash:''
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })

    .addCase(toggleStatusModal, (state, action) => {
      state.statusModalOpen =
        action.payload.statusModalOpen !== undefined ? action.payload.statusModalOpen : !state.statusModalOpen
    })
    .addCase(toggleStatus, (state, action) => {
      state.status = action.payload.status !== undefined ? action.payload.status : 1
    })
    .addCase(updateTransactionHash, (state, action) => {
      state.transactionHash =
        action.payload.transactionHash !== undefined ? action.payload.transactionHash : ''
    })
  
   
)
