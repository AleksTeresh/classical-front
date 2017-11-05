/* @flow */
/* global Generator */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

import type { Action } from '../../actions'

function * fetchGigs (action: Action): Generator<any, any, any> {
  try {
    const gigs = yield call(client.fetchGigs, '', 10, 0)
    yield put({ type: 'search-gigs-load-success', gigs: gigs })
  } catch (e) {
    yield put({ type: 'search-gigs-load-failure' })
  }
}

function * searchClientSaga (): Generator<any, any, any> {
  yield takeEvery('search-gigs-load-request', fetchGigs)
}

export default searchClientSaga
