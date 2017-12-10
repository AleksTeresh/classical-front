/* @flow */
'use strict'

import type { WatchdogRepr } from './types'

export type FetchWatchdogsAction = { type: 'watchdog-fetch-request' }
export type RemoveWatchdogAction = { type: 'watchdog-remove-request', id: number }

export type WatchdogAction
  = FetchWatchdogsAction
  | { type: 'watchdog-fetch-success', watchdogs: Array<WatchdogRepr> }
  | { type: 'watchdog-fetch-failure' }

  | RemoveWatchdogAction
  | { type: 'watchdog-remove-success' }
  | { type: 'watchdog-remove-failure' }

  | { type: 'watchdog-confirm-reset' }
