// Token的存、取、删除
const TokenKey = 'lime_admin_token'


export const setToken = (token) => {
  localStorage.setItem(TokenKey, token)
}

export const getToken = () => {
  return localStorage.getItem(TokenKey)
}

export const removeToken = () => {
  localStorage.removeItem(TokenKey)
}