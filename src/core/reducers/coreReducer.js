/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { CoreState } from '../types'

const initialState: CoreState = {
  authors: {
    authors: [],
    count: 0
  },
  genres: [],
  venues: []
}

export default function filterReducer (
  state: CoreState = initialState,
  action: Action
): CoreState {
  switch (action.type) {
    case 'core-venues-load-success':
      return {
        ...state,
        venues: action.venues
      }

    case 'core-genres-load-success':
      return {
        ...state,
        genres: action.genres
      }

    case 'core-authors-load-success':
      return {
        ...state,
        authors: action.authors
      }

    default:
      return state
  }
}
