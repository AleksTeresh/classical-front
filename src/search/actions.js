/* @flow */
'use strict'

import type { Gig } from '../core/types'

export type GigLoadAction = {
  type: 'search-gigs-load-request',
  keyPhrase: string,
  startDate: string,
  endDate: string,
  offset: number,
  venues: Array<number>,
  genres: Array<number>,
  authors: Array<number>
}

export type CreateWatchdogAction = {
  type: 'search-watchdog-create-request',
  keyPhrase: string,
  startDate: string,
  endDate: string,
  venues: Array<number>,
  genres: Array<number>,
  authors: Array<number>
}

export type SearchAction
  = GigLoadAction
  | { type: 'search-gigs-load-success', gigs: Array<Gig> }
  | { type: 'search-gigs-load-failure' }

  | CreateWatchdogAction
  | { type: 'search-watchdog-create-success' }
  | { type: 'search-watchdog-create-failure' }

  | { type: 'search-start' }

  // Filter actions
  | { type: 'search-filter-search-edit', search: string }
  | { type: 'search-filter-author-toggle', id: number }
  | { type: 'search-filter-venue-toggle', id: number }
  | { type: 'search-filter-genre-toggle', id: number }
  | { type: 'search-filter-start-date-edit', startDate: string }
  | { type: 'search-filter-end-date-edit', endDate: string }

  // Paginationactions
  | { type: 'search-pagination-gig-count-set', count: number }
  | { type: 'search-pagination-gig-page-set', page: number }
  | { type: 'search-pagination-author-count-set', count: number }
  | { type: 'search-pagination-author-page-set', page: number }
