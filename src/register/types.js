/* @flow */
'use strict'

export type InputState = {
  email: string,
  password: string,
  passwordRepeat: string,
  name: string
}

export type FeedbackState = {
  error: boolean
}

export type RegisterState = {
  input: InputState,
  feedback: FeedbackState
}
