/* @flow */
'use strict'

import type { Action } from '../../actions'

export function load (id: number): Action {
  return {
    type: 'details-gig-load-request',
    id: id
  }
}

export function likePerformance (id: number): Action {
  return {
    type: 'details-performance-like-request',
    id: id
  }
}

export function subscribe (id: number): Action {
  return {
    type: 'details-gig-subscribe-request',
    id: id
  }
}
