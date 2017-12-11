/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { Gig } from '../../core/types'

const initialState: Gig = {
  id: 0,
  name: '',
  description: '',
  performances: [],
  timestamp: 0,
  duration: 0,
  venue: {
    id: 0,
    name: '',
    description: '',
    lat: 0,
    lng: 0
  }
}

export default function gigReducer (
  state: Gig = initialState,
  action: Action
): Gig {
  switch (action.type) {
    case 'details-gig-load-success':
      return action.gig

    default:
      return state
  }
}
