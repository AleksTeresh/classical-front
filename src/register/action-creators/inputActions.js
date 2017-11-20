/* @flow */
'use strict'

import type { Action } from '../../actions'

export function editEmail (email: string): Action {
  return {
    type: 'register-email-edit',
    email: email
  }
}

export function editPassword (password: string): Action {
  return {
    type: 'register-password-edit',
    password: password
  }
}

export function editPasswordRepeat (passwordRepeat: string): Action {
  return {
    type: 'register-password-repeat-edit',
    passwordRepeat: passwordRepeat
  }
}

export function editName (name: string): Action {
  return {
    type: 'register-name-edit',
    name: name
  }
}

export function reset (): Action {
  return {
    type: 'register-input-reset'
  }
}
