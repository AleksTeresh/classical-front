/* @flow */
'use strict'

import 'whatwg-fetch'
import { HttpClient, json } from 'aurelia-fetch-client'
import Promise from 'bluebird'

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
      (endDate ? ('&endDate=' + endDate) : ''),
    {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
    )
    .then(response => {
      return response.json()
    })
}

export function fetchGig (id: number): Promise<Gig> {
  return httpClient.fetch(
    '/api/gig/' + id,
    {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  )
    .then(response => response.json())
}

export function fetchVenues (): Promise<Array<Venue>> {
  return httpClient.fetch(
    '/api/venue',
    {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  )
    .then(response => response.json())
}

export function fetchVenue (id: number): Promise<Venue> {
  return httpClient.fetch(
    '/api/venue/' + id,
    {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  )
    .then(response => response.json())
}

export function fetchGenres (): Promise<Array<Genre>> {
  return httpClient.fetch(
    '/api/genre',
    {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  )
    .then(response => response.json())
}

export function fetchGenre (id: number): Promise<Genre> {
  return httpClient.fetch(
    '/api/genre/' + id,
    {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  )
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
    '&offset=' + offset,
    {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  )
    .then(response => response.json())
}

export function fetchAuthor (id: number): Promise<Author> {
  return httpClient.fetch(
    '/api/author/' + id,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  )
    .then(response => response.json())
}

export function login (
  email: string,
  password: string
): Promise<boolean> {
  return httpClient.fetch(
    '/api/auth',
    {
      method: 'post',
      body: json({
        email,
        password
      })
    }
  )
    .then(p => p.json())
    // .then(r => handleAuthResponse(r.json()))
}

export function register (
  email: string,
  password: string,
  name: string
): Promise<boolean> {
  return httpClient.fetch(
    '/api/register',
    {
      method: 'post',
      body: json({
        email,
        password,
        name
      })
    }
  )

    // .then(r => handleAuthResponse(r))
}

export function createWatchdog (
  keyPhrase?: string = '',
  authorIds?: Array<number>,
  genreIds?: Array<number>,
  venueIds?: Array<number>,
  startDate?: string,
  endDate?: string
): Promise<any> {
  return httpClient.fetch(
    '/api/watchdog',
    {
      method: 'post',
      body: json({
        keyPhrase,
        startDate,
        endDate,
        authorIds,
        genreIds,
        venueIds
      }),
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  )
}

export function fetchWatchdogs (): Promise<Array<Watchdog>> {
  return httpClient.fetch(
    '/api/watchdog',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  )
    .then(p => p.json())
}

export function removeWatchdog (id: number): Promise<any> {
  return httpClient.fetch(
    '/api/watchdog/' + id,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
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
