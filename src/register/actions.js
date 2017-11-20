/* @flow */
'use strict'

export type SubmitRegisterAction
  = { type: 'register-submit-request', email: string, password: string, name: string }

export type RegisterAction
  = SubmitRegisterAction
  | { type: 'register-submit-success' }
  | { type: 'register-submit-failure' }

  // input actions
  | { type: 'register-input-reset' }
  | { type: 'register-email-edit', email: string }
  | { type: 'register-password-edit', password: string }
  | { type: 'register-password-repeat-edit', passwordRepeat: string }
  | { type: 'register-name-edit', name: string }
