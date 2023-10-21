import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  name: '',
  email: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logAdminIn(state, action) {
      state.token = action.payload.token
      state.name = action.payload.name
      state.email = action.payload.email
    },
    logAdminOut() {
      return initialState
    }
  }
})

export const authSliceActions = authSlice.actions
export default authSlice.reducer
