/* @flow */
'use strict'

export type InputState = {
  email: string,
  password: string,
  passwordRepeat: string,
  name: string
}

export type ConfirmState = {
  status: 'success' | 'failure' | 'none',
  message: string
}

export type RegisterState = {
  input: InputState,
  confirm: ConfirmState
}
