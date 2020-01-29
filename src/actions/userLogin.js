import { USER_LOGIN, USER_LOGOUT } from './actiionTypes'

export const userLoginValidation = (username, password) => {
  return {
    type: USER_LOGIN,
    username: username,
    password: password
  }
}