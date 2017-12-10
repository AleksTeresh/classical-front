/* @flow */
'use strict'

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

import type { RegisterState } from './types'
import type { AppState } from '../types'

@inject(ValidationControllerFactory, Validator, DialogService)
export class Register {
  register: RegisterState;
  controller: any;
  canSubmit: boolean;
  validator: any;

  dialogService: any;

  constructor (controllerFactory: any, validator: any, dialogService: any) {
    this.dialogService = dialogService

    subscribe(this.update.bind(this))

    dispatch(actionCreators.inputActions.reset())

    this.register = getState().register

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
      .ensure('passwordRepeat').required()
        .satisfies((v) => v === this.register.input.password).withMessage('The value does not match the password')
      .ensure('name').required()
      .on(this)
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
    if (
      this.register &&
      this.register.confirm.status !== state.register.confirm.status
    ) {
      let heading = ''
      let content = ''
      if (state.register.confirm.status === 'failure') {
        heading = 'Error'
        content = state.register.confirm.message
      }

      if (heading !== '') {
        this.dialogService.open({
          viewModel: ConfirmDialog,
          model: { heading, content },
          lock: false
        })
        .whenClosed(response => {
          dispatch(actionCreators.confirmActions.reset())
        })
      }
    }

    this.register = state.register
  }
}
