/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { Gig } from '../../core/types'

const initialState: Array<Gig> = []

export default function gigReducer (
  state: Array<Gig> = initialState,
  action: Action
): Array<Gig> {
  switch (action.type) {
    case 'details-gig-load-success':
      return action.suggestions

    default:
      return state
  }
}
