/* @flow */
'use strict'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { SearchState } from './types'
import type { AppState } from '../types'
import type { Author, Venue, Genre } from '../core/types'

export class Search {
  search: SearchState;
  authors: Array<Author>;
  venues: Array<Venue>;
  genres: Array<Genre>;

  constructor () {
    subscribe(this.update.bind(this))

    this.search = getState().search
    dispatch(actionCreators.gigActions.load())
  }

  editSearch (value: string) {
    dispatch(actionCreators.filterActions.editSearch(value))
  }

  update (state: AppState) {
    this.search = state.search
    this.authors = state.core.authors
    this.genres = state.core.genres
    this.venues = state.core.venues
  }
}
