/* @flow */
'use strict'

import type { Action } from '../../actions'

export function reset (): Action {
  return {
    type: 'search-reset'
  }
}
