/* @flow */
'use strict'

import { inject } from 'aurelia-framework'
import {
    Validator,
    ValidationControllerFactory,
    ValidationRules,
    validateTrigger
} from 'aurelia-validation'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { LoginState } from './types'
import type { AppState } from '../types'

@inject(ValidationControllerFactory, Validator)
export class Login {
  login: LoginState;
  controller: any;
  canSubmit: boolean;
  validator: any;

  constructor (controllerFactory: any, validator: any) {
    subscribe(this.update.bind(this))

    dispatch(actionCreators.loginActions.reset())

    this.login = getState().login

    this.validator = validator

    this.canSubmit = false
    this.controller = controllerFactory.createForCurrentScope(validator)
    this.controller.validateTrigger = validateTrigger.changeOrBlur
    this.controller.subscribe(event => this.validateWhole())
  }

  activate () {
    this.setupValidation()
  }

  validateWhole () {
    this.validator.validateObject(this)
        .then(results => {
          this.canSubmit = results.every(result => result.valid)
        })
  }

  setupValidation () {
    ValidationRules
      .ensure('email').email().required()
      .ensure('password').required().minLength(6)
        .withMessage('Password must at least be 6 chars long.')
      .on(this)
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
