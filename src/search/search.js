/* @flow */
'use strict'

import $ from 'jquery'
import moment from 'moment'

import { inject } from 'aurelia-framework'
import { DialogService } from 'aurelia-dialog'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import { ConfirmDialog } from '../core/components/confirmDialog'

import config from '../config'

import type { SearchState } from './types'
import type { AppState } from '../types'
import type { Author, Venue, Genre } from '../core/types'

@inject(DialogService)
export class Search {
  search: SearchState;
  authors: Array<Author>;
  venues: Array<Venue>;
  genres: Array<Genre>;

  selectedVenueIds: Array<string>

  dialogService: any;

  constructor (dialogService: any) {
    this.dialogService = dialogService

    subscribe(this.update.bind(this))

    // dispatch(actionCreators.generalActions.start())

    this.search = getState().search
    dispatch(actionCreators.gigActions.load(
      this.search.pagination.gig.page * config.fetchLimit.gig,
      this.search.filter.search,
      this.search.filter.startDate,
      this.search.filter.endDate,
      this.search.filter.genres,
      this.search.filter.authors,
      this.search.filter.venues,
      this.search.filter.ignoreAuthorFilter,
      this.search.filter.ignoreGenreFilter,
      this.search.filter.ignoreStartDateFilter,
      this.search.filter.ignoreEndDateFilter
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
    dispatch(actionCreators.filterActions.toggleVenue(Number(authorId)))
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

  toggleAuthorIgnore () {
    dispatch(actionCreators.filterActions.toggleAuthorIgnore())
  }

  toggleGenreIgnore () {
    dispatch(actionCreators.filterActions.toggleGenreIgnore())
  }

  toggleStartDateIgnore () {
    dispatch(actionCreators.filterActions.toggleStartDateIgnore())
  }

  toggleEndDateIgnore () {
    dispatch(actionCreators.filterActions.toggleEndDateIgnore())
  }

  isVanueIncluded (venueId: number) {
    return this.search.filter.venues
      .includes(venueId)
  }

  isGenreIncluded (genreId: number) {
    return this.search.filter.genres
      .includes(genreId)
  }

  get numberOfPages (): number {
    return Math.ceil(this.search.pagination.gig.count / config.fetchLimit.gig)
  }

  get currentPage (): number {
    return this.search.pagination.gig.page
  }

  get isLoggedIn (): boolean {
    const token = window.localStorage.getItem('token')
    return token !== undefined && token !== null &&
      token !== '' && token !== 'undefined'
  }

  submitFilter () {
    dispatch(actionCreators.gigActions.load(
      this.search.pagination.gig.page * config.fetchLimit.gig,
      this.search.filter.search,
      this.search.filter.startDate,
      this.search.filter.endDate,
      this.search.filter.genres,
      this.search.filter.authors,
      this.search.filter.venues,
      this.search.filter.ignoreAuthorFilter,
      this.search.filter.ignoreGenreFilter,
      this.search.filter.ignoreStartDateFilter,
      this.search.filter.ignoreEndDateFilter
    ))
  }

  createWatchdog () {
    dispatch(actionCreators.watchdogActions.createWatchdog(
      this.search.filter.search,
      this.search.filter.startDate,
      this.search.filter.endDate,
      this.search.filter.genres,
      this.search.filter.authors,
      this.search.filter.venues,
      this.search.filter.ignoreAuthorFilter,
        this.search.filter.ignoreGenreFilter,
      this.search.filter.ignoreStartDateFilter,
      this.search.filter.ignoreEndDateFilter
    ))
  }

  setGigPage (value: number) {
    dispatch(actionCreators.paginationActions.setGigPage(value))
    dispatch(actionCreators.gigActions.load(
      value * config.fetchLimit.gig,
      this.search.filter.search,
      this.search.filter.startDate,
      this.search.filter.endDate,
      this.search.filter.genres,
      this.search.filter.authors,
      this.search.filter.venues,
      this.search.filter.ignoreAuthorFilter,
        this.search.filter.ignoreGenreFilter,
      this.search.filter.ignoreStartDateFilter,
      this.search.filter.ignoreEndDateFilter
    ))
  }

  update (state: AppState) {
    if (this.search.confirm.watchdog !== state.search.confirm.watchdog) {
      let heading = ''
      let content = ''
      if (state.search.confirm.watchdog === 'success') {
        heading = 'Success'
        content = `A new watchdog was successfully created. You can find all
          of your watchdogs, if you navigate to the "Watchdogs" tab`
      } else if (state.search.confirm.watchdog === 'failure') {
        heading = 'Error'
        content = `An error occurred while trying to create the watchdog!
          ` + state.search.confirm.message
      }

      if (heading !== '') {
        this.dialogService.open({
          viewModel: ConfirmDialog,
          model: { heading, content },
          lock: false
        })
        .whenClosed(response => {
          dispatch(actionCreators.confirmActions.resetWatchdog())
        })
      }
    }

    this.search = state.search
    this.authors = state.core.authors.authors
    this.genres = state.core.genres
    this.venues = state.core.venues

    this.selectedVenueIds = state.search.filter.venues
      .map((p) => p.toString())
  }

  getDayOfWeek (time: number): string {
    return moment(time).format('dddd')
  }

  getDayOfMonth (time: number): string {
    return moment(time).format('D')
  }

  getYear (time: number): string {
    return moment(time).format('YYYY')
  }

  getMonth (time: number): string {
    return moment(time).format('MMMM')
  }

  getStringDateTime (time: number): string {
    return moment(time).format('YYYY-MM-DD')
  }

  handlePropagation (event: any) {
    if (event.target.tagName === 'A') {
      event.stopPropagation()
      window.open(event.target.href, '_blank')
    }
  }

  resetFilters () {
    dispatch(actionCreators.generalActions.reset())
  }
}
