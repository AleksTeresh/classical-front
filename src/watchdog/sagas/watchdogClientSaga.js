/* @flow */
/* global Generator */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'
import { getState } from '../../core/storeHandler'

import type {
  FetchWatchdogsAction,
  RemoveWatchdogAction
} from '../actions'

function * fetchWatchdogs (action: FetchWatchdogsAction): Generator<any, any, any> {
  try {
    const watchdogs = yield call(
      client.fetchWatchdogs
    )

    const authors = getState().core.authors.authors
    const genres = getState().core.genres
    const venues = getState().core.venues

    const watchdogRepresentations = watchdogs.map((p) => ({
      id: p.id,
      startDate: p.startDate.substring(0, p.startDate.length - 9),
      endDate: p.startDate.substring(0, p.endDate.length - 9),
      authors: p.authorIds.map((p) => authors.filter((s) => s.id === p)[0].name),
      genres: p.genreIds.map((p) => genres.filter((s) => s.id === p)[0].name),
      venues: p.venueIds.map((p) => venues.filter((s) => s.id === p)[0].name)
    }))
    yield put({ type: 'watchdog-fetch-success', watchdogs: watchdogRepresentations })
  } catch (e) {
    yield put({ type: 'watchdog-fetch-failure' })
  }
}

function * removeWatchdog (action: RemoveWatchdogAction): Generator<any, any, any> {
  try {
    yield call(
      client.removeWatchdog,
      action.id
    )
    yield put({ type: 'watchdog-remove-success' })
  } catch (e) {
    yield put({ type: 'watchdog-remove-failure' })
  }
}

function * watchdogClientSaga (): Generator<any, any, any> {
  yield takeEvery('watchdog-fetch-request', fetchWatchdogs)
  yield takeEvery('watchdog-remove-request', removeWatchdog)
}

export default watchdogClientSaga
