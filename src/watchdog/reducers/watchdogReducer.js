/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { WatchdogState } from '../types'

const initialState: WatchdogState = {
  all: []
}

export default function watchdogReducer (
  state: WatchdogState = initialState,
  action: Action
): WatchdogState {
  switch (action.type) {
    case 'watchdog-fetch-success':
      return {
        ...initialState,
        all: action.watchdogs
      }

    default:
      return state
  }
}
