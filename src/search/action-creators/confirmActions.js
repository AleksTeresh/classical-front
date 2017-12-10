/* @flow */
'use strict'

import type { Action } from '../../actions'

export function resetWatchdog (): Action {
  return {
    type: 'search-confirm-watchdog-reset'
  }
}
