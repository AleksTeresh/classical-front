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
  startDate: string,
  endDate: string,
  venues: Array<number>,
  ignoreAuthorFilter: boolean,
  ignoreGenreFilter: boolean,
  ignoreStartDateFilter: boolean,
  ignoreEndDateFilter: boolean
}

export type PaginationEntity = {
  page: number,
  count: number
}

export type PaginationState = {
  gig: PaginationEntity,
  author: PaginationEntity
}

export type ConfirmState = {
  watchdog: 'failure' | 'success' | 'none'
}

export type SearchState = {
  gig: GigState,
  filter: FilterState,
  pagination: PaginationState,
  confirm: ConfirmState
}
