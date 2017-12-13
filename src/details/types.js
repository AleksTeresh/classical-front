/* @flow */
'use strict'

import type { Gig, DetailedGig } from '../core/types'

export type SelectionState = {
  performanceId: number
}

export type DetailsState = {
  gig: DetailedGig,
  suggestions: Array<Gig>,
  selection: SelectionState
}
