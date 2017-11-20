/* @flow */
'use strict'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { RegisterState } from './types'
import type { AppState } from '../types'

export class Register {
  register: RegisterState;

  constructor () {
    subscribe(this.update.bind(this))

    dispatch(actionCreators.inputActions.reset())

    this.register = getState().register
  }

  editEmail (value: string) {
    dispatch(actionCreators.inputActions.editEmail(value))
  }

  editPassword (value: string) {
    dispatch(actionCreators.inputActions.editPassword(value))
  }

  editPasswordRepeat (value: string) {
    dispatch(actionCreators.inputActions.editPasswordRepeat(value))
  }

  editName (value: string) {
    dispatch(actionCreators.inputActions.editName(value))
  }

  submit () {
    dispatch(actionCreators.generalActions.submit(
      this.register.input.email,
      this.register.input.password,
      this.register.input.name
    ))
  }

  update (state: AppState) {
    this.register = state.register
  }
}
