/* @flow */
'use strict'

import $ from 'jquery'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import config from '../config'

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

    dispatch(actionCreators.generalActions.start())

    this.search = getState().search
    dispatch(actionCreators.gigActions.load(
      this.search.pagination.gig.page * config.fetchLimit.gig,
      this.search.filter.search,
      this.search.filter.startDate,
      this.search.filter.endDate,
      this.search.filter.genres,
      this.search.filter.authors,
      this.search.filter.venues
    ))
  }

  attached () {
    $('#start-date').datepicker({
      format: 'dd.mm.yyyy'
    })
    .on('changeDate', (e) => this.editStartDate(e.target.value))

    $('#end-date').datepicker({
      format: 'dd.mm.yyyy'
    })
    .on('changeDate', (e) => this.editEndDate(e.target.value))
  }

  editSearch (value: string) {
    dispatch(actionCreators.filterActions.editSearch(value))
  }

  toggleAuthor (options: Array<any>) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected !== this.search.filter.authors.includes(Number(options[i].value))) {
        dispatch(actionCreators.filterActions.toggleAuthor(Number(options[i].value)))
      }
    }
  }

  toggleVenue (authorId: number) {
    dispatch(actionCreators.filterActions.toggleVenue(authorId))
  }

  toggleGenre (authorId: number) {
    dispatch(actionCreators.filterActions.toggleGenre(authorId))
  }

  editStartDate (value: string) {
    dispatch(actionCreators.filterActions.editStartDate(value))
  }

  editEndDate (value: string) {
    dispatch(actionCreators.filterActions.editEndDate(value))
  }

  isVanueIncluded (venueId: number) {
    return this.search.filter.venues
      .includes(venueId)
  }

  isGenreIncluded (genreId: number) {
    return this.search.filter.genres
      .includes(genreId)
  }

  submitFilter () {
    dispatch(actionCreators.gigActions.load(
      this.search.pagination.gig.page * config.fetchLimit.gig,
      this.search.filter.search,
      this.search.filter.startDate,
      this.search.filter.endDate,
      this.search.filter.genres,
      this.search.filter.authors,
      this.search.filter.venues
    ))
  }

  createWatchdog () {
    dispatch(actionCreators.watchdogActions.createWatchdog(
      this.search.filter.search,
      this.search.filter.startDate,
      this.search.filter.endDate,
      this.search.filter.genres,
      this.search.filter.authors,
      this.search.filter.venues
    ))
  }

  update (state: AppState) {
    this.search = state.search
    this.authors = state.core.authors.authors
    this.genres = state.core.genres
    this.venues = state.core.venues
  }
}
