/* @flow */
'use strict'

import type { Action } from '../../actions'

export function start (): Action {
  return {
    type: 'search-start'
  }
}
