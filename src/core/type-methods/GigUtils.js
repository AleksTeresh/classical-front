/* @flow */
'use strict'

import { List } from 'immutable'

import type { Gig, GigPlain } from '../types'

export function toPlain (
  gig: Gig
): GigPlain {
  return {
    id: gig.id,
    imageUrl: gig.imageUrl,
    name: gig.name,
    description: gig.description,
    performances: gig.performances.toArray(),
    timestamp: gig.timestamp,
    duration: gig.duration
  }
}

export function fromPlain (
  gig: GigPlain
): Gig {
  return {
    id: gig.id,
    imageUrl: gig.imageUrl,
    name: gig.name,
    description: gig.description,
    performances: List(gig.performances),
    timestamp: gig.timestamp,
    duration: gig.duration
  }
}
