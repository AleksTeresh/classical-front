/* @flow */
'use strict'

import type { Action } from '../../actions'

export function createWatchdog (
  keyPhrase: string,
  startDate: string,
  endDate: string,
  genres: Array<number>,
  authors: Array<number>,
  venues: Array<number>,
  ignoreAuthorFilter: boolean,
  ignoreStartDateFilter: boolean,
  ignoreEndDateFilter: boolean
): Action {
  return {
    type: 'search-watchdog-create-request',
    keyPhrase: keyPhrase,
    startDate: startDate,
    endDate: endDate,
    genres: genres,
    authors: authors,
    venues: venues,
    ignoreAuthorFilter: ignoreAuthorFilter,
    ignoreStartDateFilter: ignoreStartDateFilter,
    ignoreEndDateFilter: ignoreEndDateFilter
  }
}
