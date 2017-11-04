/* @flow */
'use strict'

import type { Action } from '../../actions'

export function load (): Action {
  return {
    type: 'search-gigs-load-request'
  }
}
