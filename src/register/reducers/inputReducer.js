/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { InputState } from '../types'

const initialState: InputState = {
  email: '',
  password: '',
  passwordRepeat: '',
  name: ''
}

export default function gigReducer (
  state: InputState = initialState,
  action: Action
): InputState {
  switch (action.type) {
    case 'register-input-reset':
      return initialState

    case 'register-email-edit':
      return {
        ...state,
        email: action.email
      }

    case 'register-password-edit':
      return {
        ...state,
        password: action.password
      }

    case 'register-password-repeat-edit':
      return {
        ...state,
        passwordRepeat: action.passwordRepeat
      }

    case 'register-name-edit':
      return {
        ...state,
        name: action.name
      }

    default:
      return state
  }
}
