/* @flow */
'use strict'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { LoginState } from './types'
import type { AppState } from '../types'

export class Login {
  login: LoginState;

  constructor () {
    subscribe(this.update.bind(this))

    dispatch(actionCreators.loginActions.reset())

    this.login = getState().login
  }

  editEmail (value: string) {
    dispatch(actionCreators.loginActions.editEmail(value))
  }

  editPassword (value: string) {
    dispatch(actionCreators.loginActions.editPassword(value))
  }

  submit () {
    dispatch(actionCreators.loginActions.signIn(
      this.login.email,
      this.login.password
    ))
  }

  update (state: AppState) {
    this.login = state.login
  }
}
