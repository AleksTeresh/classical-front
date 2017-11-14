/* @flow */
'use strict'

import type { Action } from '../../actions'

export function load (
  offset: number,
  keyPhrase: string,
  startDate: string,
  endDate: string,
  genres: Array<number>,
  authors: Array<number>,
  venues: Array<number>
): Action {
  return {
    type: 'search-gigs-load-request',
    offset: offset,
    keyPhrase: keyPhrase,
    startDate: startDate,
    endDate: endDate,
    genres: genres,
    authors: authors,
    venues: venues
  }
}
