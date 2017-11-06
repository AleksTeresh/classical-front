/* @flow */
/* global Generator */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { GigResponse } from '../../core/types'

function * fetchGigs (action: Action): Generator<any, any, any> {
  try {
    const gigResponse: GigResponse = yield call(client.fetchGigs, '', 10, 0)
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
