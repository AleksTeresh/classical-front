/* @flow */
/* global Generator */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'
import { continueBootstrapping } from '../../app'

import config from '../../config'

import type { Action } from '../../actions'

let authorsReady = false
let genresReady = false
let venuesReady = false

function * fetchAuthors (action: Action): Generator<any, any, any> {
  try {
    const authors = yield call(client.fetchAuthors, '', config.fetchLimit.author)
    yield put({ type: 'core-authors-load-success', authors: authors })
    authorsReady = true
    checkEntitiesAreReady()
  } catch (e) {
    console.error(e)
    yield put({ type: 'core-authors-load-failure' })
  }
}

function * fetchVenues (action: Action): Generator<any, any, any> {
  try {
    const venues = yield call(client.fetchVenues)
    yield put({ type: 'core-venues-load-success', venues: venues })
    genresReady = true
    checkEntitiesAreReady()
  } catch (e) {
    console.error(e)
    yield put({ type: 'core-venues-load-failure' })
  }
}

function * fetchGenres (action: Action): Generator<any, any, any> {
  try {
    const genres = yield call(client.fetchGenres)
    yield put({ type: 'core-genres-load-success', genres: genres })
    venuesReady = true
    checkEntitiesAreReady()
  } catch (e) {
    console.error(e)
    yield put({ type: 'core-genres-load-failure' })
  }
}

function * searchClientSaga (): Generator<any, any, any> {
  yield takeEvery('core-authors-load-request', fetchAuthors)
  yield takeEvery('core-venues-load-request', fetchVenues)
  yield takeEvery('core-genres-load-request', fetchGenres)
}

function checkEntitiesAreReady () {
  if (authorsReady && genresReady && venuesReady) {
    continueBootstrapping()
  }
}

export default searchClientSaga
