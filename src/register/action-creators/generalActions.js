/* @flow */
'use strict'

import type { Action } from '../../actions'

export function submit (email: string, password: string, name: string): Action {
  return {
    type: 'register-submit-request',
    email: email,
    password: password,
    name: name
  }
}
