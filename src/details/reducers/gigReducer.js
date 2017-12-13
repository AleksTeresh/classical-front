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

    case 'details-performance-like-success':
      const likeAction = action
      return {
        ...state,
        performances: state.performances.map((p) => p.id === likeAction.performanceId
        ? {
          ...p,
          liked: !p.liked
        }
        : p)
      }

    default:
      return state
  }
}
