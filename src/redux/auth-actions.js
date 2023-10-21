import { authSliceActions } from './auth-slice'
import { loginAdmin } from 'src/api'

export const logInAdminAction = values => {
  return async dispatch => {
    try {
      const loginData = await loginAdmin(values.email, values.password)
      await dispatch(authSliceActions.logAdminIn(loginData))
      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export const logoutAdminAction = () => {
  return async dispatch => {
    try {
      await dispatch(authSliceActions.logAdminOut())
      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
