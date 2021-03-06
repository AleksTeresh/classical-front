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
  author: Author,
  conductor?: string,
  player?: string,
  name: string,
  description: string,
  imageUrl?: string,
  youtubeId?: string,
  wikipediaLink: string,
  genres: Array<Genre>,
  liked: boolean
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
  // performances: Array<Performance>,
  timestamp: number,
  duration: number,
  // venue: Venue
}

export type DetailedGig = {
  id: number,
  imageUrl?: string,
  name: string,
  description: string,
  performances: Array<Performance>,
  timestamp: number,
  duration: number
  // venue: Venue,
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

export type Watchdog = {
  keyPhrase: string,
  authorIds: Array<number>,
  genreIds: Array<number>,
  venueIds: Array<number>,
  startDate: string,
  endDate: string,
  allGenres: boolean,
  allAuthors: boolean
}

export type CoreState = {
  genres: Array<Genre>,
  authors: {
    count: number,
    authors: Array<Author>
  },
  venues: Array<Venue>
}
