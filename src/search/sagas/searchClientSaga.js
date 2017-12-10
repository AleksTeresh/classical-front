/* @flow */
/* global Generator */
'use strict'

import moment from 'moment'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

import config from '../../config'

import type { GigLoadAction, CreateWatchdogAction } from '../actions'
import type { GigResponse } from '../../core/types'

function * fetchGigs (action: GigLoadAction): Generator<any, any, any> {
  try {
    const gigResponse: GigResponse = yield call(
      client.fetchGigs,
      action.keyPhrase,
      config.fetchLimit.gig,
      action.offset,
      action.ignoreAuthorFilter
      ? undefined
      : action.authors,
      action.ignoreGenreFilter
      ? undefined
      : action.genres,
      action.venues,
      action.ignoreStartDateFilter
      ? undefined
      : moment(action.startDate, 'DD.MM.YYYY').format('YYYY-MM-DD'),
      action.ignoreEndDateFilter
      ? undefined
      : moment(action.endDate, 'DD.MM.YYYY').format('YYYY-MM-DD')
    )
    yield put({ type: 'search-gigs-load-success', gigs: gigResponse.gigs })
    yield put({ type: 'search-pagination-gig-count-set', count: gigResponse.count })
  } catch (e) {
    console.error(e)
    yield put({ type: 'search-gigs-load-failure' })
  }
}

function * createWatchdog (action: CreateWatchdogAction): Generator<any, any, any> {
  try {
    const result = yield call(
      client.createWatchdog,
      action.keyPhrase,
      action.ignoreAuthorFilter
      ? undefined
      : action.authors,
      action.ignoreGenreFilter
      ? undefined
      : action.genres,
      action.venues,
      action.ignoreStartDateFilter
      ? undefined
      : moment(action.startDate, 'DD.MM.YYYY').format('YYYY-MM-DD'),
      action.ignoreEndDateFilter
      ? undefined
      : moment(action.endDate, 'DD.MM.YYYY').format('YYYY-MM-DD')
    )
    if (result.ok) {
      yield put({ type: 'search-watchdog-create-success' })
    } else {
      yield put({ type: 'search-watchdog-create-failure' })
    }
  } catch (e) {
    console.error(e)
    yield put({ type: 'search-watchdog-create-failure' })
  }
}

function * searchClientSaga (): Generator<any, any, any> {
  yield takeEvery('search-gigs-load-request', fetchGigs)
  yield takeEvery('search-watchdog-create-request', createWatchdog)
}

export default searchClientSaga
