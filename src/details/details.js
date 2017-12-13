/* @flow */
'use strict'

import moment from 'moment'
import $ from 'jquery'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import { TokenUtils } from '../core/lib'

import type { DetailsState } from './types'
import type { AppState } from '../types'
import type { Performance } from '../core/types'

export default class Details {
  details: DetailsState

  selectedPerformance: Performance;

  unsubscribe: () => void;

  constructor () {
    this.unsubscribe = subscribe(this.update.bind(this))

    this.update(getState())
  }

  activate (params: any) {
    dispatch(actionCreators.gigActions.load(params.id))
  }
/*
  attached () {
    const oldYoutubeId = this.selectedPerformance
    ? this.selectedPerformance.youtubeId
    : ''
    console.log('attached', this.selectedPerformance)
    if (
      this.selectedPerformance &&
      oldYoutubeId !== this.selectedPerformance.youtubeId &&
      this.selectedPerformance.youtubeId
    ) {
      $('#youtubeIFrame')[0].contentWindow
        .location
        .replace('https://www.youtube.com/embed/' +
          (this.selectedPerformance.youtubeId || ''))
    }
  }
*/
  detached () {
    this.unsubscribe()
  }

  get selectedYoutubeId (): string {
    if (!this.selectedPerformance || !this.selectedPerformance.youtubeId) {
      return ''
    }

    return this.selectedPerformance.youtubeId
  }

  get selectedAuthorWikiLink (): string {
    if (!this.selectedPerformance || !this.selectedPerformance.author) {
      return ''
    }

    return this.selectedPerformance.author.wikipediaLink
  }

  get selectedAuthorName (): string {
    if (!this.selectedPerformance || !this.selectedPerformance.author) {
      return ''
    }

    return this.selectedPerformance.author.name || ''
  }

  get selectedAuthorDescription (): string {
    if (!this.selectedPerformance || !this.selectedPerformance.author) {
      return ''
    }

    return this.selectedPerformance.author.description || ''
  }

  get selectedOpusName (): string {
    if (!this.selectedPerformance) {
      return ''
    }

    return this.selectedPerformance.name || ''
  }

  get selectedOpusWikiLink (): string {
    if (!this.selectedPerformance) {
      return ''
    }

    return this.selectedPerformance.wikipediaLink || ''
  }

  get time (): string {
    return moment(this.details.gig.timestamp).format('D MMM YYYY HH:mm')
  }

  get duration (): string {
    return humanize(this.details.gig.duration)
  }

  get liked (): boolean {
    if (!this.selectedPerformance || !this.isLoggedIn) {
      return false
    }

    return this.selectedPerformance.liked
  }

  like () {
    dispatch(
      actionCreators.gigActions
        .likePerformance(this.selectedPerformance.id)
    )
  }

  get isLoggedIn (): boolean {
    return TokenUtils.checkToken()
  }

  update (state: AppState) {
    this.details = state.details

    const oldYoutubeId = this.selectedPerformance
    ? this.selectedPerformance.youtubeId
    : ''
    this.selectedPerformance = this.details.gig.performances
      .filter((p) => p.id === this.details.selection.performanceId)[0]

    if ($('#youtubeIFrame')[0]) {
      if (
        this.selectedPerformance &&
        oldYoutubeId !== this.selectedPerformance.youtubeId &&
        this.selectedPerformance.youtubeId
      ) {
        $('#youtubeIFrame')[0].contentWindow
          .location
          .replace('https://www.youtube.com/embed/' +
            (this.selectedPerformance.youtubeId || ''))
      }
    } else {
      // a hack around to make sure, an initial iframe youtube video is loaded
      // on the page load
      let intervalId = -1
      intervalId = setTimeout(() => {
        if (
          this.selectedPerformance &&
          oldYoutubeId !== this.selectedPerformance.youtubeId &&
          $('#youtubeIFrame')[0] &&
          this.selectedPerformance.youtubeId
        ) {
          clearInterval(intervalId)

          $('#youtubeIFrame')[0].contentWindow
            .location
            .replace('https://www.youtube.com/embed/' +
              (this.selectedPerformance.youtubeId || ''))
        }
      }, 100)
    }
  }
}

function humanize (time) {
  let duration = moment.duration(time, 'milliseconds')
  let timeString = ''

  if (duration.days() > 0) {
    timeString += duration.days() > 1
    ? (duration.days() + ' days ')
    : (duration.days() + ' day ')
  }

  if (duration.hours() > 0) {
    timeString += duration.hours() > 1
    ? (duration.hours() + ' hours ')
    : (duration.hours() + ' hour ')
  }

  if (duration.minutes() > 0) {
    timeString += duration.minutes() > 1
    ? (duration.minutes() + ' minutes ')
    : (duration.minutes() + ' minute ')
  }

  return timeString
}
