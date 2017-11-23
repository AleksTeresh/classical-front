/* @flow */
/* global Generator */
'use strict'

import moment from 'moment'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

function * fetchGig (
  action: { type: 'details-gig-load-request', id: number }
): Generator<any, any, any> {
  try {
    let gig = yield call(client.fetchGig, action.id)
    let sameAuthorGigs = (yield call(
      client.fetchGigs,
      '',
      30,
      0,
      gig.performances.map((p) => p.author.id),
      null,
      null,
      moment().format('YYYY-MM-DD'),
      moment().add(1, 'y').format('YYYY-MM-DD')
    )).gigs

    sameAuthorGigs = sameAuthorGigs.filter((p) => p.id !== gig.id)
    sameAuthorGigs.sort((a, b) => {
      if (a.venue.id === b.venue.id) {
        return 0
      }

      if (
        a.venue.id === gig.venue.id && b.venue.id !== gig.venue.id
      ) {
        return -1
      }

      return 1
    })
    yield put({
      type: 'details-gig-load-success',
      gig: gig,
      suggestions: sameAuthorGigs.slice(0, 3)
    })
    if (gig.performances.length > 0) {
      yield put({
        type: 'details-performance-select',
        id: gig.performances[0].id
      })
    }
  } catch (e) {
    console.error(e)

    yield put({ type: 'details-gig-load-failure' })
  }
}

function * detailsClientSaga (): Generator<any, any, any> {
  yield takeEvery('details-gig-load-request', fetchGig)
}

export default detailsClientSaga
