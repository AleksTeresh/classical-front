/* @flow */
/* global Generator */
/* global location */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

import type { SubmitRegisterAction } from '../actions'

function * register (action: SubmitRegisterAction): Generator<any, any, any> {
  try {
    yield call(
      client.register,
      action.email,
      action.password,
      action.name
    )
    yield put({ type: 'register-submit-success' })
    location.assign('#/login/')
  } catch (e) {
    console.error(e)
    yield put({ type: 'register-submit-failure' })
  }
}

function * registerClientSaga (): Generator<any, any, any> {
  yield takeEvery('register-submit-request', register)
}

export default registerClientSaga
