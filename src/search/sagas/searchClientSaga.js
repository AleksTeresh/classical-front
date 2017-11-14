/* @flow */
/* global Generator */
'use strict'

import moment from 'moment'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

import config from '../../config'

import type { GigLoadAction } from '../actions'
import type { GigResponse } from '../../core/types'

function * fetchGigs (action: GigLoadAction): Generator<any, any, any> {
  try {
    console.log(action.startDate, action.endDate)
    const gigResponse: GigResponse = yield call(
      client.fetchGigs,
      action.keyPhrase,
      config.fetchLimit.gig,
      0,
      action.authors,
      action.genres,
      action.venues,
      moment(action.startDate, 'DD.MM.YYYY').format('YYYY-MM-DD'),
      moment(action.endDate, 'DD.MM.YYYY').format('YYYY-MM-DD')
    )
    yield put({ type: 'search-gigs-load-success', gigs: gigResponse.gigs })
    yield put({ type: 'search-pagination-gig-count-set', count: gigResponse.count })
  } catch (e) {
    yield put({ type: 'search-gigs-load-failure' })
  }
}

function * searchClientSaga (): Generator<any, any, any> {
  yield takeEvery('search-gigs-load-request', fetchGigs)
}

export default searchClientSaga
