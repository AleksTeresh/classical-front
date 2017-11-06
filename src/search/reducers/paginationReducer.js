/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { PaginationState } from '../types'

const initialState: PaginationState = {
  gig: {
    page: 0,
    count: 0
  },
  author: {
    page: 0,
    count: 0
  },
}

export default function gigReducer (
  state: PaginationState = initialState,
  action: Action
): PaginationState {
  switch (action.type) {
    case 'search-pagination-gig-count-set':
      return {
        ...state,
        gig: {
          ...state.gig,
          count: action.count
        }
      }

    case 'search-pagination-author-count-set':
      return {
        ...state,
        author: {
          ...state.author,
          count: action.count
        }
      }

    case 'search-pagination-gig-page-set':
      return {
        ...state,
        gig: {
          ...state.gig,
          page: action.page
        }
      }

    case 'search-pagination-author-page-set':
      return {
        ...state,
        author: {
          ...state.author,
          page: action.page
        }
      }

    default:
      return state
  }
}
