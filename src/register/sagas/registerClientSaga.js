/* @flow */
/* global Generator */
/* global location */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as client from '../../core/client'

import type { SubmitRegisterAction } from '../actions'

function * register (action: SubmitRegisterAction): Generator<any, any, any> {
  try {
    const result = yield call(
      client.register,
      action.email,
      action.password,
      action.name
    )
    if (result.ok) {
      yield put({ type: 'register-submit-success' })
      location.assign('#/login/')
    } else {
      const jsonResponse = yield result.json()
      yield put({
        type: 'register-submit-failure',
        message: jsonResponse.message
      })
    }
  } catch (e) {
    console.error(e)
    yield put({ type: 'register-submit-failure', message: e.message })
  }
}

function * registerClientSaga (): Generator<any, any, any> {
  yield takeEvery('register-submit-request', register)
}

export default registerClientSaga
