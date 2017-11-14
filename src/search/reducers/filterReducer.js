/* @flow */
'use strict'

import moment from 'moment'

import type { Action } from '../../actions'
import type { FilterState } from '../types'

const initialState: FilterState = {
  search: '',
  authors: [],
  genres: [],
  startDate: '',
  endDate: '',
  venues: []
}

export default function filterReducer (
  state: FilterState = initialState,
  action: Action
): FilterState {
  switch (action.type) {
    case 'search-start':
      return {
        ...state,
        startDate: moment().format('DD.MM.YYYY'),
        endDate: moment().add(1, 'y').format('DD.MM.YYYY')
      }

    case 'core-venues-load-success':
      return {
        ...state,
        venues: action.venues.map((p) => p.id)
      }

    case 'core-genres-load-success':
      return {
        ...state,
        genres: action.genres.map((p) => p.id)
      }

    case 'core-authors-load-success':
      return {
        ...state,
        authors: action.authors.authors.map((p) => p.id)
      }

    case 'search-filter-search-edit':
      return {
        ...state,
        search: action.search
      }

    case 'search-filter-author-toggle':
      if (state.authors.includes(Number(action.id))) {
        state.authors.splice(state.authors.indexOf(Number(action.id)), 1)
        return state
      }

      state.authors.push(action.id)
      return state

    case 'search-filter-venue-toggle':
      if (state.venues.includes(Number(action.id))) {
        state.venues.splice(state.venues.indexOf(Number(action.id)), 1)
        return state
      }

      state.venues.push(action.id)
      return state

    case 'search-filter-genre-toggle':
      if (state.genres.includes(Number(action.id))) {
        state.genres.splice(state.genres.indexOf(Number(action.id)), 1)
        return state
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
