/* @flow */
'use strict'

import moment from 'moment'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { DetailsState } from './types'
import type { AppState } from '../types'
// import type { Performance } from '../core/types'

export default class Details {
  details: DetailsState
  routeConfig: any;
  // selectedPerformance: Performance;

  constructor () {
    subscribe(this.update.bind(this))

    this.details = getState().details
  }
  activate (params: any, routeConfig: any) {
    this.routeConfig = routeConfig

    dispatch(actionCreators.gigActions.load(params.id))
  }

  get getSelectedId (): string {
    const selectedPerformance = this.details.gig.performances
      .filter((p) => p.id === this.details.selection.performanceId)[0]

    if (!selectedPerformance || !selectedPerformance.youtubeId) {
      return 'KpOtuoHL45Y' // a hardcoded default
    }

    return selectedPerformance.youtubeId
  }

  get selectedAuthorWikiLink (): string {
    const selectedPerformance = this.details.gig.performances
      .filter((p) => p.id === this.details.selection.performanceId)[0]

    if (!selectedPerformance || !selectedPerformance.author) {
      return '' // a hardcoded default
    }

    return selectedPerformance.author.wikipediaLink
  }

  get selectedAuthorDescription (): string {
    const selectedPerformance = this.details.gig.performances
      .filter((p) => p.id === this.details.selection.performanceId)[0]

    if (!selectedPerformance || !selectedPerformance.author) {
      return '' // a hardcoded default
    }

    return selectedPerformance.author.description || ''
  }

  getTime () {
    return moment(this.details.gig.timestamp).format('D MMM YYYY')
  }

  getDuration () {
    return moment.duration(this.details.gig.duration, 'seconds').humanize()
  }

  update (state: AppState) {
    this.details = state.details
  }
}
