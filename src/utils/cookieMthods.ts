import {getCookie, setCookie, deleteCookie} from 'cookies-next'

export function setAuthToken(token: string) {
  return setCookie('auth-token', token, {path:'/'})
}

export function removeAuthToken() {
  return deleteCookie('auth-token')
}

export function removeActiveOrgToken() {
  return deleteCookie('active_companyId')
}