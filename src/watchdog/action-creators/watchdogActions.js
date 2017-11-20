/* @flow */
'use strict'

import type { Action } from '../../actions'

export function fetch (): Action {
  return {
    type: 'watchdog-fetch-request'
  }
}

export function remove (id: number): Action {
  return {
    type: 'watchdog-remove-request',
    id: id
  }
}
