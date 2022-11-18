import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal'

export const store = configureStore({
  reducer: {
    Auth: authSlice.reducer,
    journal: journalSlice.reducer
  },
})