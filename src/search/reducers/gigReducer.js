/* @flow */
'use strict'

import { filterGigs } from '../../core/utils/filters'

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
        all: action.gigs,
        filtered: action.gigs
      }

    case 'search-filter-search-edit':
      return {
        ...state,
        filtered: filterGigs(state.all, action.search)
      }

    default:
      return state
  }
}
