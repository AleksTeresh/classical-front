/* @flow */
'use strict'

// import Fuse from 'fuse.js'

import type { Action } from '../../actions'
import type { GigState } from '../types'

const initialState: GigState = {
  all: [],
  filtered: []
}

export default function gigReducer (
  state: GigState = initialState,
  action: Action
): GigState {
  switch (action.type) {
    case 'search-gigs-load-success':
      return {
        ...state,
        all: action.gigs
      }

    default:
      return state
  }
}
