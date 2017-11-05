/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { SelectionState } from '../types'

const initialState: SelectionState = {
  performanceId: 0
}

export default function gigReducer (
  state: SelectionState = initialState,
  action: Action
): SelectionState {
  switch (action.type) {
    case 'details-performance-select':
      return {
        ...state,
        performanceId: action.id
      }

    default:
      return state
  }
}
