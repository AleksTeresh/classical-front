/* @flow */
'use strict'

// import { filterGigs } from '../../core/utils/filters'

import type { Action } from '../../actions'
import type { ConfirmState } from '../types'

const initialState: ConfirmState = {
  status: 'none',
  message: ''
}

export default function confirmReducer (
  state: ConfirmState = initialState,
  action: Action
): ConfirmState {
  switch (action.type) {
    case 'search-confirm-watchdog-reset':
      return {
        ...state,
        status: 'none',
        message: ''
      }

    case 'search-watchdog-create-success':
      return {
        ...state,
        status: 'success',
        message: ''
      }

    case 'search-watchdog-create-failure':
      return {
        ...state,
        status: 'failure',
        message: action.message
      }

    default:
      return state
  }
}
