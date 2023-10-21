import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import { createWrapper } from 'next-redux-wrapper'

export const store = configureStore({
  reducer: {
    auth: authSlice
  }
})

const makeStore = () => store

export const wrapper = createWrapper(makeStore)
