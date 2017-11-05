/* @flow */
/* global Generator */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

function * fetchGig (
  action: { type: 'details-gig-load-request', id: number }
): Generator<any, any, any> {
  try {
    const gig = yield call(client.fetchGig, action.id)
    yield put({ type: 'details-gig-load-success', gig: gig, suggestions: [] })
  } catch (e) {
    yield put({ type: 'details-gig-load-failure' })
  }
}

function * detailsClientSaga (): Generator<any, any, any> {
  yield takeEvery('details-gig-load-request', fetchGig)
}

export default detailsClientSaga
