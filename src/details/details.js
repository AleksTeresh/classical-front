/* @flow */
'use strict'

import moment from 'moment'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { DetailsState } from './types'
import type { AppState } from '../types'

export default class Details {
  details: DetailsState
  routeConfig: any;

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

    if (!selectedPerformance || !selectedPerformance.youTubeId) {
      return 'KpOtuoHL45Y' // a hardcoded default
    }

    return selectedPerformance.youTubeId
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
