/* @flow */
/* global Generator */
'use strict'

import moment from 'moment'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'
import { ImageUtils } from '../../core/lib'

import defaultImage from '../../../static/classical.jpg'

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

    let gigs = gigResponse.gigs.map((p) => {
      if (!ImageUtils.isImageUrlValid(p.imageUrl)) {
        return {
          ...p,
          imageUrl: defaultImage
        }
      }

      return p
    })

    yield put({ type: 'search-gigs-load-success', gigs: gigs })
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
      : moment(action.endDate, 'DD.MM.YYYY').format('YYYY-MM-DD'),
      action.ignoreGenreFilter,
      action.ignoreAuthorFilter
    )

    if (result.ok) {
      yield put({ type: 'search-watchdog-create-success' })
    } else {
      const jsonResponse = yield result.json()
      yield put({
        type: 'search-watchdog-create-failure',
        message: jsonResponse.message
      })
    }
  } catch (e) {
    console.error(e)
    yield put({ type: 'search-watchdog-create-failure', message: e.message })
  }
}

function * searchClientSaga (): Generator<any, any, any> {
  yield takeEvery('search-gigs-load-request', fetchGigs)
  yield takeEvery('search-watchdog-create-request', createWatchdog)
}

export default searchClientSaga
