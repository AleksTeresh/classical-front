/* @flow */
'use strict'

import type { Action } from '../../actions'

export function editSearch (search: string): Action {
  return {
    type: 'search-filter-search-edit',
    search: search
  }
}

export function toggleAuthor (id: number): Action {
  return {
    type: 'search-filter-author-toggle',
    id: id
  }
}

export function toggleVenue (id: number): Action {
  return {
    type: 'search-filter-venue-toggle',
    id: id
  }
}

export function toggleGenre (id: number): Action {
  return {
    type: 'search-filter-genre-toggle',
    id: id
  }
}

export function editStartDate (startDate: string): Action {
  return {
    type: 'search-filter-start-date-edit',
    startDate: startDate
  }
}

export function editEndDate (endDate: string): Action {
  return {
    type: 'search-filter-end-date-edit',
    endDate: endDate
  }
}
