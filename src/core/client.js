/* @flow */
'use strict'

import 'whatwg-fetch'
import { HttpClient } from 'aurelia-fetch-client'

import Promise from 'bluebird'

// import { GigUtils } from './type-methods'

import type { Gig, Venue, Genre, Author } from './types'

const httpClient = new HttpClient()

export function fetchGigs (
  keyPhrase?: string = '',
  limit?: number = 10,
  offset?: number = 0,
  author?: number
): Promise<Gig> {
  return httpClient.fetch(
      '/api/gig?keyPhrase=' + keyPhrase +
      '&limit=' + limit +
      '&offset=' + offset +
      (author ? ('&author=' + author) : '')
    )
    .then(response => {
      return response.json()
    })
    .then(gigs => {
      return gigs // .map(GigUtils.fromPlain)
    })
}

export function fetchGig (id: number): Promise<Gig> {
  return httpClient.fetch('/api/gig/' + id)
    .then(response => response.json())
  /*  .then(gig => {
      return GigUtils.fromPlain(gig)
    })  */
}

export function fetchVenues (): Promise<Array<Venue>> {
  return httpClient.fetch('/api/venue')
    .then(response => response.json())
}

export function fetchAuthors (
  keyPhrase?: string = '',
  limit?: number = 10,
  offset?: number = 0,
  author?: number
): Promise<Array<Author>> {

  /*
  return httpClient.fetch('/api/author')
    .then(response => response.json())
    */
}

export function fetchGenres (): Promise<Array<Genre>> {
  return httpClient.fetch('/api/genre')
    .then(response => response.json())
}
