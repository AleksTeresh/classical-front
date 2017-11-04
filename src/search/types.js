/* @flow */
'use strict'

import type { Gig } from '../core/types'

export type GigState = {
  all: Array<Gig>,
  filtered: Array<Gig>
}

export type Genre = {
  id: number,
  name: string
}

export type FilterState = {
  search: string,
  authors: Array<number>,
  genres: Array<number>,
  startDate: number,
  endDate: number,
  venues: Array<number>
}

export type SearchState = {
  gig: GigState,
  filter: FilterState
}
