/* @flow */
'use strict'

export type WatchdogRepr = {
  keyPhrase: string,
  authors: Array<string>,
  genres: Array<string>,
  venues: Array<string>,
  startDate: string,
  endDate: string
}

export type WatchdogState = {
  all: Array<WatchdogRepr>
}
