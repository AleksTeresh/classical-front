/* @flow */
'use strict'

export function checkToken (): boolean {
  const token = window.localStorage.getItem('token')

  return token && token !== null && token !== undefined &&
    token !== 'undefined' && token !== 'null'
}

export function removeToken () {
  window.localStorage.removeItem('token')
}
