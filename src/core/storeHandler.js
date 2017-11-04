/* @flow */
'use strict'

import store from '../store'

import type { AppState } from '../types'
import type { Action } from '../actions'

export function subscribe (updater: (state: AppState) => void) {
  store.subscribe(() => updater(store.getState()))
}

export function dispatch (action: Action) {
  store.dispatch(action)
}

export function getState (): AppState {
  return store.getState()
}
