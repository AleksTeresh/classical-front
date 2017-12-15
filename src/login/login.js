/* @flow */
'use strict'

import $ from 'jquery'

import { inject } from 'aurelia-framework'
import {
    Validator,
    ValidationControllerFactory,
    ValidationRules,
    validateTrigger
} from 'aurelia-validation'
import { DialogService } from 'aurelia-dialog'

import { ConfirmDialog } from '../core/components/confirmDialog'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { LoginState } from './types'
import type { AppState } from '../types'

@inject(ValidationControllerFactory, Validator, DialogService)
export class Login {
  login: LoginState;
  controller: any;
  canSubmit: boolean;
  validator: any;

  dialogService: any;
  unsubscribe: () => void;

  constructor (controllerFactory: any, validator: any, dialogService: any) {
    this.dialogService = dialogService

    this.unsubscribe = subscribe(this.update.bind(this))

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

  attached () {
    $(window.document).keyup((ev) => this.handleKeyUp(ev))
  }

  detached () {
    this.unsubscribe()

    $(window.document).off('keyup')
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

  handleKeyUp (event: any) {
    if (event.keyCode === 13 && this.canSubmit) {
      this.submit()
    }
  }

  update (state: AppState) {
    if (this.login && this.login.confirm !== state.login.confirm) {
      let heading = ''
      let content = ''
      if (state.login.confirm === 'success') {
        heading = 'Success'
        content = `A new watchdog was successfully created. You can find all
          of your watchdogs, if you navigate to the "Watchdogs" tab`
      } else if (state.login.confirm === 'failure') {
        heading = 'Error'
        content = `The username or password is incorrect.`
      }

      if (heading !== '') {
        this.dialogService.open({
          viewModel: ConfirmDialog,
          model: { heading, content },
          lock: false
        })
        .whenClosed(response => {
          dispatch(actionCreators.loginActions.resetConfirm())
        })
      }
    }

    this.login = state.login
  }
}
