/* @flow */
/* global Generator */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

import type { Action } from '../../actions'

function * fetchAuthors (action: Action): Generator<any, any, any> {
  try {
    const authors = yield call(client.fetchAuthors)
    yield put({ type: 'core-authors-load-success', authors: authors })
  } catch (e) {
    yield put({ type: 'core-authors-load-failure' })
  }
}

function * fetchVenues (action: Action): Generator<any, any, any> {
  try {
    const venues = yield call(client.fetchVenues)
    yield put({ type: 'core-venues-load-success', venues: venues })
  } catch (e) {
    yield put({ type: 'core-venues-load-failure' })
  }
}

function * fetchGenres (action: Action): Generator<any, any, any> {
  try {
    const genres = yield call(client.fetchGenres)
    yield put({ type: 'core-genres-load-success', genres: genres })
  } catch (e) {
    yield put({ type: 'core-genres-load-failure' })
  }
}

function * searchClientSaga (): Generator<any, any, any> {
  yield takeEvery('core-authors-load-request', fetchAuthors)
  yield takeEvery('core-venues-load-request', fetchVenues)
  yield takeEvery('core-genres-load-request', fetchGenres)
}

export default searchClientSaga
