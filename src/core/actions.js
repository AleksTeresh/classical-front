/* @flow */
'use strict'

import type { Author, Venue, Genre } from './types'

export type CoreAction
  = { type: 'core-authors-load-request' }
  | { type: 'core-authors-load-success', authors: { count: number, authors: Array<Author> } }
  | { type: 'core-authors-load-failure' }

  | { type: 'core-venues-load-request' }
  | { type: 'core-venues-load-success', venues: Array<Venue> }
  | { type: 'core-venues-load-failure' }

  | { type: 'core-genres-load-request' }
  | { type: 'core-genres-load-success', genres: Array<Genre> }
  | { type: 'core-genres-load-failure' }
