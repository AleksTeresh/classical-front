/* @flow */
'use strict'

import moment from 'moment'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { DetailsState } from './types'
import type { AppState } from '../types'
import type { Performance } from '../core/types'

export default class Details {
  details: DetailsState
  routeConfig: any;

  selectedPerformance: Performance;

  constructor () {
    subscribe(this.update.bind(this))

    this.update(getState())
  }
  activate (params: any, routeConfig: any) {
    this.routeConfig = routeConfig

    dispatch(actionCreators.gigActions.load(params.id))
  }

  get selectedId (): string {
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
    return moment(this.details.gig.timestamp * 1000).format('D MMM YYYY')
  }

  get duration (): string {
    return moment.duration(this.details.gig.duration, 'seconds').humanize()
  }

  update (state: AppState) {
    this.details = state.details

    this.selectedPerformance = this.details.gig.performances
      .filter((p) => p.id === this.details.selection.performanceId)[0]
  }
}
