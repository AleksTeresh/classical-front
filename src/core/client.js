/* @flow */
'use strict'

import 'whatwg-fetch'
import { HttpClient, json } from 'aurelia-fetch-client'
import Promise from 'bluebird'

import { TokenUtils } from './lib'

// import { GigUtils } from './type-methods'

import type {
  Gig,
  Venue,
  Genre,
  Author,
  GigResponse,
  AuthorResponse,
  Watchdog
} from './types'

const httpClient = new HttpClient()

function getToken () {
  return window.localStorage.getItem('token')
}

function getDefaultOptions () {
  let options = {}
  if (TokenUtils.checkToken()) {
    options.headers = {
      Authorization: 'Bearer ' + getToken()
    }
  }

  return options
}

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
  let options = getDefaultOptions()

  return httpClient.fetch(
      '/api/gig?keyPhrase=' + encodeURIComponent(keyPhrase) +
      '&limit=' + limit +
      '&offset=' + offset +
      (authorIds  /* && authorIds.length > 0 */ ? ('&authors=' + authorIds.toString() + '') : '') +
      (genreIds /*  && genreIds.length > 0 */ ? ('&genres=' + genreIds.toString() + '') : '') +
      (venueIds /*  && venueIds.length > 0 */ ? ('&venues=' + venueIds.toString() + '') : '') +
      (startDate ? ('&startDate=' + startDate) : '') +
      (endDate ? ('&endDate=' + endDate) : ''),
    options
    )
    .then(response => {
      return response.json()
    })
}

export function fetchGig (id: number): Promise<Gig> {
  let options = getDefaultOptions()

  return httpClient.fetch(
    '/api/gig/' + id,
    options
  )
    .then(response => response.json())
}

export function fetchVenues (): Promise<Array<Venue>> {
  let options = getDefaultOptions()

  return httpClient.fetch(
    '/api/venue',
    options
  )
    .then(response => response.json())
}

export function fetchVenue (id: number): Promise<Venue> {
  let options = getDefaultOptions()

  return httpClient.fetch(
    '/api/venue/' + id,
    options
  )
    .then(response => response.json())
}

export function fetchGenres (): Promise<Array<Genre>> {
  let options = getDefaultOptions()

  return httpClient.fetch(
    '/api/genre',
    options
  )
    .then(response => response.json())
}

export function fetchGenre (id: number): Promise<Genre> {
  let options = getDefaultOptions()

  return httpClient.fetch(
    '/api/genre/' + id,
    options
  )
    .then(response => response.json())
}

export function fetchAuthors (
  keyPhrase?: string = '',
  limit?: number = 10,
  offset?: number = 0
): Promise<AuthorResponse> {
  let options = getDefaultOptions()

  return httpClient.fetch(
    '/api/author?keyPhrase=' + encodeURIComponent(keyPhrase) +
    '&limit=' + limit +
    '&offset=' + offset,
    options
  )
    .then(response => response.json())
}

export function fetchAuthor (id: number): Promise<Author> {
  let options = getDefaultOptions()
  options.method = 'GET'

  return httpClient.fetch(
    '/api/author/' + id,
    options
  )
    .then(response => response.json())
}

export function login (
  email: string,
  password: string
): Promise<boolean> {
  let options = getDefaultOptions()
  options.method = 'post'
  options.body = json({
    email,
    password
  })

  return httpClient.fetch(
    '/api/auth',
    options
  )
    .then(p => p.json())
    // .then(r => handleAuthResponse(r.json()))
}

export function register (
  email: string,
  password: string,
  name: string
): Promise<boolean> {
  let options = getDefaultOptions()
  options.method = 'post'
  options.body = json({
    email,
    password,
    name
  })

  return httpClient.fetch(
    '/api/register',
    options
  )
    // .then(r => handleAuthResponse(r))
}

export function createWatchdog (
  keyPhrase?: string = '',
  authorIds?: Array<number>,
  genreIds?: Array<number>,
  venueIds?: Array<number>,
  startDate?: string,
  endDate?: string,
  allGenres?: boolean = false,
  allAuthors?: boolean = false
): Promise<any> {
  let options = getDefaultOptions()
  options.method = 'post'
  options.body = json({
    keyPhrase,
    startDate,
    endDate,
    authorIds,
    genreIds,
    venueIds,
    allGenres,
    allAuthors
  })

  return httpClient.fetch(
    '/api/watchdog',
    options
  )
}

export function likePerformance (
  performanceId: number
): Promise<any> {
  let options = getDefaultOptions()
  options.method = 'post'
  options.body = json({
    performanceId
  })

  return httpClient.fetch(
    '/api/like',
    options
  )
}

export function fetchWatchdogs (): Promise<Array<Watchdog>> {
  let options = getDefaultOptions()
  options.method = 'GET'

  return httpClient.fetch(
    '/api/watchdog',
    options
  )
    .then(p => p.json())
}

export function removeWatchdog (id: number): Promise<any> {
  let options = getDefaultOptions()
  options.method = 'DELETE'

  return httpClient.fetch(
    '/api/watchdog/' + id,
    options
  )
}
/*
function handleAuthResponse (r: any) {
  r.then((p) => {
    if (p.token) {
      window.localStorage.setItem('token', p.token)
    }
  })
} */
