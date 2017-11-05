/* @flow */
'use strict'

import Fuse from 'fuse.js'

import type { Gig } from '../types'

export function filterGigs (gigs: Array<Gig>, search: string) {
  if (search === '') {
    return gigs
  }
  return new Fuse(gigs, {
    distance: 100,
    location: 0,
    threshold: 0.08,
    keys: ['description', 'name']
  }).search(search)
}
