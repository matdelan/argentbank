export const loginSuccess = (token) => {
    return {
      type: 'LOGIN_SUCCESS',
      payload: token,
    }
}
export const loginFail= () => {
    return {
      type: 'LOGIN_FAIL',
    }
}
export const logout= () => {
    return {
      type: 'LOGOUT',
    }
}