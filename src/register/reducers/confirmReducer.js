/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { ConfirmState } from '../types'

function getDefaultState (): ConfirmState {
  return {
    message: '',
    status: 'none'
  }
}

export default function confirmReducer (
  state: ConfirmState = getDefaultState(),
  action: Action
): ConfirmState {
  switch (action.type) {
    case 'register-confirm-reset':
      return {
        ...state,
        message: '',
        status: 'none'
      }

    case 'register-submit-failure':
      return {
        ...state,
        message: action.message,
        status: 'failure'
      }

    default:
      return state
  }
}
