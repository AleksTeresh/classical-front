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
    yield put({
      type: 'details-gig-load-success',
      gig: gig,
      suggestions: [
        {
          id: 1,
          name: 'Tsaikovski evening',
          description: 'Some relevant description goes here. It says about the event, the venue and other stuff.',
          performances: [],
          timestamp: 0,
          duration: 0,
          venue: {
            id: 0,
            name: '',
            description: '',
            lat: 0,
            lng: 0
          }
        },
        {
          id: 2,
          name: 'Tsaikovski morning',
          description: 'Some relevant description goes here. It says about the event, the venue and other stuff.',
          performances: [],
          timestamp: 0,
          duration: 0,
          venue: {
            id: 0,
            name: '',
            description: '',
            lat: 0,
            lng: 0
          }
        },
        {
          id: 3,
          name: 'Tsaikovski afternoon',
          description: 'Some relevant description goes here. It says about the event, the venue and other stuff.',
          performances: [],
          timestamp: 0,
          duration: 0,
          venue: {
            id: 0,
            name: '',
            description: '',
            lat: 0,
            lng: 0
          }
        }
      ]
    })
    if (gig.performances.length > 0) {
      yield put({
        type: 'details-performance-select',
        id: gig.performances[0].id
      })
    }
  } catch (e) {
    yield put({ type: 'details-gig-load-failure' })
  }
}

function * detailsClientSaga (): Generator<any, any, any> {
  yield takeEvery('details-gig-load-request', fetchGig)
}

export default detailsClientSaga
