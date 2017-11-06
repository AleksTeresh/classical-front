/* @flow */
'use strict'

import type { Gig } from '../core/types'

export type SearchAction
  = { type: 'search-gigs-load-request' }
  | { type: 'search-gigs-load-success', gigs: Array<Gig> }
  | { type: 'search-gigs-load-failure' }

  // Filter actions
  | { type: 'search-filter-search-edit', search: string }
  | { type: 'search-filter-author-toggle', id: number }
  | { type: 'search-filter-venue-toggle', id: number }
  | { type: 'search-filter-genre-toggle', id: number }
  | { type: 'search-filter-start-date-edit', startDate: number }
  | { type: 'search-filter-end-date-edit', endDate: number }

  // Paginationactions
  | { type: 'search-pagination-gig-count-set', count: number }
  | { type: 'search-pagination-gig-page-set', page: number }
  | { type: 'search-pagination-author-count-set', count: number }
  | { type: 'search-pagination-author-page-set', page: number }
