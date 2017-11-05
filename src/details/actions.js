/* @flow */
'use strict'

import type { Gig } from '../core/types'

export type DetailsAction
  = { type: 'details-gig-load-request', id: number }
  | { type: 'details-gig-load-success', gig: Gig, suggestions: Array<Gig> }
  | { type: 'details-gig-load-failure' }

  | { type: 'details-gig-subscribe-request', id: number }
  | { type: 'details-gig-subscribe-success' }
  | { type: 'details-gig-subscribe-failure' }

  | { type: 'details-gig-like-request', id: number }
  | { type: 'details-gig-like-success' }
  | { type: 'details-gig-like-failure' }

  // selection
  | { type: 'details-performance-select', id: number }
