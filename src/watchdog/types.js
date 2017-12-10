/* @flow */
'use strict'

export type WatchdogRepr = {
  keyPhrase: string,
  allGenres: boolean,
  allAuthors: boolean,
  authors: Array<string>,
  genres: Array<string>,
  venues: Array<string>,
  startDate: string,
  endDate: string
}

export type WatchdogState = {
  all: Array<WatchdogRepr>
}

export type ConfirmState = {
  watchdog: 'failure' | 'success' | 'none'
}

export type WatchdogViewState = {
  watchdog: WatchdogState,
  confirm: ConfirmState
}
