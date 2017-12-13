/* @flow */
'use strict'

import type { Gig, DetailedGig } from '../core/types'

export type DetailsAction
  = { type: 'details-gig-load-request', id: number }
  | { type: 'details-gig-load-success', gig: DetailedGig, suggestions: Array<Gig> }
  | { type: 'details-gig-load-failure' }

  | { type: 'details-gig-subscribe-request', id: number }
  | { type: 'details-gig-subscribe-success' }
  | { type: 'details-gig-subscribe-failure' }

  | { type: 'details-performance-like-request', id: number }
  | { type: 'details-performance-like-success', performanceId: number }
  | { type: 'details-performance-like-failure' }

  // selection
  | { type: 'details-performance-select', id: number }
