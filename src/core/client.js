/* @flow */
'use strict'

import 'whatwg-fetch'
import { HttpClient } from 'aurelia-fetch-client'

import Promise from 'bluebird'

import { List } from 'immutable'

import { GigUtils } from './type-methods'

import type { Gig } from './types'

const httpClient = new HttpClient()

export function fetchGigs (
  keyPhrase?: string = '',
  limit?: number = 10,
  offset?: number = 0,
  author?: string = ''
): Promise<Gig> {
  return httpClient.fetch(
      '/api/gig?keyPhrase=' + keyPhrase +
      '&limit=' + limit +
      '&offset=' + offset +
      '&author=' + author
    )
    .then(response => response.json())
    .then(gigs => {
      return List(gigs).map(GigUtils.fromPlain)
    })
}

export function fetchGig (id: number): Promise<Gig> {
  return httpClient.fetch('/api/gig/' + id)
    .then(response => response.json())
    .then(gig => {
      return GigUtils.fromPlain(gig)
    })
}
