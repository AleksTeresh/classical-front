/* @flow */
'use strict'

import type { Gig } from '../core/types'

export type SelectionState = {
  performanceId: number
}

export type DetailsState = {
  gig: Gig,
  suggestions: Array<Gig>,
  selection: SelectionState
}
