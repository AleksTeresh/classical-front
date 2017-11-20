/* @flow */
'use strict'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { WatchdogState } from './types'
import type { Author, Venue, Genre } from '../core/types'
import type { AppState } from '../types'

export class Register {
  watchdog: WatchdogState;

  authors: Array<Author>;
  venues: Array<Venue>;
  genres: Array<Genre>;

  constructor () {
    subscribe(this.update.bind(this))

    dispatch(actionCreators.watchdogActions.fetch())

    this.watchdog = getState().watchdog
  }

  removeWatchdog (id: number) {
    dispatch(actionCreators.watchdogActions.remove(id))
  }

  getAuthorRepr (authorIds: Array<number>) {
    // allAuthorIds = this.authors.map((p) => p.id)

    return authorIds.map((p) => {
      const author = this.authors.filter((s) => s.id === p)[0]

      return author.name
    }).join(', ')

    // return preresult.substring(preresult.length - 2)
  }

  update (state: AppState) {
    this.watchdog = state.watchdog

    this.authors = state.core.authors.authors
    this.genres = state.core.genres
    this.venues = state.core.venues
  }
}
