/* @flow */
'use strict'

// import { filterGigs } from '../../core/utils/filters'

import type { Action } from '../../actions'
import type { ConfirmState } from '../types'

const initialState: ConfirmState = {
  watchdog: 'none'
}

export default function confirmReducer (
  state: ConfirmState = initialState,
  action: Action
): ConfirmState {
  switch (action.type) {
    case 'watchdog-confirm-reset':
      return {
        ...state,
        watchdog: 'none'
      }

    case 'watchdog-remove-success':
      return {
        ...state,
        watchdog: 'success'
      }

    case 'watchdog-remove-failure':
      return {
        ...state,
        watchdog: 'failure'
      }

    default:
      return state
  }
}
