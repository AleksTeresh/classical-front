/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { FilterState } from '../types'

const initialState: FilterState = {
  search: '',
  authors: [],
  genres: [],
  startDate: 0,
  endDate: 0,
  venues: []
}

export default function filterReducer (
  state: FilterState = initialState,
  action: Action
): FilterState {
  switch (action.type) {
    case 'search-filter-search-edit':
      return {
        ...state,
        search: action.search
      }

    case 'search-filter-author-toggle':
      if (state.authors.includes(action.id)) {
        return {
          ...state,
          authors: state.authors.splice(state.authors.indexOf(action.id), 1)
        }
      }

      state.authors.push(action.id)
      return state

    case 'search-filter-venue-toggle':
      if (state.venues.includes(action.id)) {
        return {
          ...state,
          venues: state.venues.splice(state.venues.indexOf(action.id), 1)
        }
      }

      state.venues.push(action.id)
      return state

    case 'search-filter-genre-toggle':
      if (state.genres.includes(action.id)) {
        return {
          ...state,
          genres: state.genres.splice(state.genres.indexOf(action.id), 1)
        }
      }

      state.genres.push(action.id)
      return state

    case 'search-filter-start-date-edit':
      return {
        ...state,
        startDate: action.startDate
      }

    case 'search-filter-end-date-edit':
      return {
        ...state,
        endDate: action.endDate
      }

    default:
      return state
  }
}
