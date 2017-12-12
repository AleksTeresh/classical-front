/* @flow */
'use strict'

import moment from 'moment'

import type { Action } from '../../actions'
import type { FilterState } from '../types'

const initialState: FilterState = {
  search: '',
  authors: [],
  genres: [],
  startDate: moment().format('DD.MM.YYYY'),
  endDate: moment().add(4, 'M').format('DD.MM.YYYY'),
  venues: [],
  ignoreAuthorFilter: true,
  ignoreGenreFilter: true,
  ignoreStartDateFilter: false,
  ignoreEndDateFilter: false
}

export default function filterReducer (
  state: FilterState = initialState,
  action: Action
): FilterState {
  switch (action.type) {
    case 'search-reset':
      return {
        ...state,
        search: '',
        authors: [],
        genres: [],
        venues: [],
        startDate: moment().format('DD.MM.YYYY'),
        endDate: moment().add(4, 'M').format('DD.MM.YYYY'),
        ignoreAuthorFilter: true,
        ignoreGenreFilter: true,
        ignoreStartDateFilter: false,
        ignoreEndDateFilter: false
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

    case 'search-filter-author-ignore-toggle':
      return {
        ...state,
        ignoreAuthorFilter: !state.ignoreAuthorFilter
      }

    case 'search-filter-genre-ignore-toggle':
      return {
        ...state,
        ignoreGenreFilter: !state.ignoreGenreFilter
      }

    case 'search-filter-start-date-ignore-toggle':
      return {
        ...state,
        ignoreStartDateFilter: !state.ignoreStartDateFilter
      }

    case 'search-filter-end-date-ignore-toggle':
      return {
        ...state,
        ignoreEndDateFilter: !state.ignoreEndDateFilter
      }

    default:
      return state
  }
}
