/* @flow */
'use strict'

// import { List } from 'immutable'

export type Author = {
  id: number,
  imageUrl?: number,
  name: string,
  description?: string,
  wikipediaLink: string
}

export type AuthorResponse = {
  authors: Array<Author>,
  count: number
}

export type Genre = {
  id: number,
  name: string
}

export type Performance = {
  id: number,
  author: string,
  conductor?: string,
  player?: string,
  name: string,
  description: string,
  imageUrl?: string,
  youtubeId?: string,
  genres: Array<Genre>
}

export type Venue = {
  id: number,
  imageUrl?: string,
  name: string,
  description: string
  // lat: number,
  // lng: number
}

export type Gig = {
  id: number,
  imageUrl?: string,
  name: string,
  description: string,
  performances: Array<Performance>,
  timestamp: number,
  duration: number,
  venue: Venue
}
/*
export type GigPlain = {
  id: number,
  imageUrl?: string,
  name: string,
  description: string,
  performances: Array<Performance>,
  timestamp: number,
  duration: number,
  venue: Venue
}
*/
export type GigResponse = {
  gigs: Array<Gig>,
  count: number
}

export type CoreState = {
  genres: Array<Genre>,
  authors: Array<Author>,
  venues: Array<Venue>
}
