/* @flow */
'use strict'

import 'whatwg-fetch'
import { HttpClient } from 'aurelia-fetch-client'

import Promise from 'bluebird'

// import { GigUtils } from './type-methods'

import type {
  Gig,
  Venue,
  Genre,
  Author,
  GigResponse,
  AuthorResponse
} from './types'

const httpClient = new HttpClient()

export function fetchGigs (
  keyPhrase?: string = '',
  limit?: number = 10,
  offset?: number = 0,
  authorIds?: Array<number>,
  genreIds?: Array<number>,
  venueIds?: Array<number>,
  startDate?: string,
  endDate?: string
): Promise<GigResponse> {
  return httpClient.fetch(
      '/api/gig?keyPhrase=' + encodeURIComponent(keyPhrase) +
      '&limit=' + limit +
      '&offset=' + offset +
      (authorIds  /* && authorIds.length > 0 */ ? ('&authors=' + authorIds.toString() + '') : '') +
      (genreIds /*  && genreIds.length > 0 */ ? ('&genres=' + genreIds.toString() + '') : '') +
      (venueIds /*  && venueIds.length > 0 */ ? ('&venues=' + venueIds.toString() + '') : '') +
      (startDate ? ('&startDate=' + startDate) : '') +
      (endDate ? ('&endDate=' + endDate) : '')
    )
    .then(response => {
      return response.json()
    })
}

export function fetchGig (id: number): Promise<Gig> {
  return httpClient.fetch('/api/gig/' + id)
    .then(response => response.json())
}

export function fetchVenues (): Promise<Array<Venue>> {
  return httpClient.fetch('/api/venue')
    .then(response => response.json())
}

export function fetchVenue (id: number): Promise<Venue> {
  return httpClient.fetch('/api/venue/' + id)
    .then(response => response.json())
}

export function fetchGenres (): Promise<Array<Genre>> {
  return httpClient.fetch('/api/genre')
    .then(response => response.json())
}

export function fetchGenre (id: number): Promise<Genre> {
  return httpClient.fetch('/api/genre/' + id)
    .then(response => response.json())
}

export function fetchAuthors (
  keyPhrase?: string = '',
  limit?: number = 10,
  offset?: number = 0
): Promise<AuthorResponse> {
  return httpClient.fetch(
    '/api/author?keyPhrase=' + encodeURIComponent(keyPhrase) +
    '&limit=' + limit +
    '&offset=' + offset
  )
    .then(response => response.json())
}

export function fetchAuthor (id: number): Promise<Author> {
  return httpClient.fetch('/api/author/' + id)
    .then(response => response.json())
}
