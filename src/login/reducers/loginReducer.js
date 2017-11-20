/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { LoginState } from '../types'

function getDefaultState () {
  return {
    email: '',
    password: '',
    signedIn: false,
    error: false
  }
}

export default function loginReducer (
  state: LoginState = getDefaultState(),
  action: Action
): LoginState {
  switch (action.type) {
    case 'login-reset':
      return getDefaultState()

    case 'login-email-edit':
      return {
        ...state,
        email: action.email
      }

    case 'login-password-edit':
      return {
        ...state,
        password: action.password
      }

    case 'login-error-dismiss':
      return {
        ...state,
        error: false
      }

    case 'login-signin-success':
      return {
        ...state,
        signedIn: true,
        error: false,
        username: '',
        password: ''
      }

    case 'login-signin-failure':
      return {
        ...state,
        error: true,
        password: ''
      }

    default:
      return state
  }
}
