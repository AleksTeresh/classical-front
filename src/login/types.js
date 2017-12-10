/* @flow */
'use strict'

export type LoginState = {
  email: string,
  password: string,
  signedIn: boolean,
  error: boolean,
  confirm: 'failure' | 'success' | 'none'
}
