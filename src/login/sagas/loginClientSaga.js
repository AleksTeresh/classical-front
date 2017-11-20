/* @flow */
/* global Generator */
/* global location */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

import type { LoginSubmitAction } from '../actions'

function * login (action: LoginSubmitAction): Generator<any, any, any> {
  try {
    const response = yield call(
      client.login,
      action.username,
      action.password
    )
    // console.log(response)
    if (response.token) {
      window.localStorage.setItem('token', response.token)
      yield put({ type: 'login-signin-success' })
      location.assign('#/')
    } else {
      yield put({ type: 'login-signin-failure' })
    }
  } catch (e) {
    yield put({ type: 'login-signin-failure' })
  }
}

function * loginClientSaga (): Generator<any, any, any> {
  yield takeEvery('login-signin-request', login)
}

export default loginClientSaga
