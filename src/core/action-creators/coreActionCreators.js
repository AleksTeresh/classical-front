/* @flow */
'use strict'

import type { Action } from '../../actions'

export function loadVenues (): Action {
  return {
    type: 'core-venues-load-request'
  }
}

export function loadGenres (): Action {
  return {
    type: 'core-genres-load-request'
  }
}

export function loadAuthors (): Action {
  return {
    type: 'core-authors-load-request'
  }
}
