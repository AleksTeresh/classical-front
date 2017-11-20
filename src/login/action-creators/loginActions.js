/* @flow */
'use strict'

import type { Action } from '../../actions'

export function editEmail (email: string): Action {
  return {
    type: 'login-email-edit',
    email: email
  }
}

export function editPassword (password: string): Action {
  return {
    type: 'login-password-edit',
    password: password
  }
}

export function dismissError (): Action {
  return {
    type: 'login-error-dismiss'
  }
}

export function signIn (username: string, password: string): Action {
  return {
    type: 'login-signin-request',
    username: username,
    password: password
  }
}

export function reset (): Action {
  return {
    type: 'login-reset'
  }
}
