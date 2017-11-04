/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { CoreState } from '../types'

const initialState: CoreState = {
  authors: [],
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
        venue: action.venues
      }

    case 'core-genres-load-success':
      return {
        ...state,
        genres: action.genres
      }

    case 'core-author-load-success':
      return {
        ...state,
        authors: action.authors
      }

    default:
      return state
  }
}
