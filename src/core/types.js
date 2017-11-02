/* @flow */
'use strict'

import { List } from 'immutable'

export type Author = {
  id: number,
  name: string,
  wikipediaLink: string
}

export type Performance = {
  id: number,
  author: string,
  conductor?: string,
  player?: string,
  orchestra?: string,
  name: string,
  description: string
}

export type Gig = {
  id: number,
  imageUrl?: string,
  name: string,
  description: string,
  performances: List<Performance>,
  timestamp: number,
  duration: number
}

export type GigPlain = {
  id: number,
  imageUrl?: string,
  name: string,
  description: string,
  performances: Array<Performance>,
  timestamp: number,
  duration: number
}
