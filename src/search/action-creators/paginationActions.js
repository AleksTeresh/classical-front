/* @flow */
'use strict'

import type { Action } from '../../actions'

export function setGigPage (page: number): Action {
  return {
    type: 'search-pagination-gig-page-set',
    page: page
  }
}

export function setAuthorPage (page: number): Action {
  return {
    type: 'search-pagination-author-page-set',
    page: page
  }
}

export function setGigCount (count: number): Action {
  return {
    type: 'search-pagination-gig-count-set',
    count: count
  }
}

export function setAuthorCount (count: number): Action {
  return {
    type: 'search-pagination-author-count-set',
    count: count
  }
}
