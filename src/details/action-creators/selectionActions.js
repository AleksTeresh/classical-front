/* @flow */
'use strict'

import type { Action } from '../../actions'

export function selectPerformance (id: number): Action {
  return {
    type: 'details-performance-select',
    id: id
  }
}
