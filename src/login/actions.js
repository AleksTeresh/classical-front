/* @flow */
'use strict'

export type LoginSubmitAction
  = { type: 'login-signin-request', username: string, password: string }

export type LoginAction
  = { type: 'login-email-edit', email: string }
  | { type: 'login-password-edit', password: string }
  | { type: 'login-reset' }
  | { type: 'login-error-dismiss' }

  | LoginSubmitAction
  | { type: 'login-signin-success' }
  | { type: 'login-signin-failure' }

  | { type: 'login-confirm-reset' }
