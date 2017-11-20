/* @flow */
'use strict'

import { bindable } from 'aurelia-framework'

import { dispatch } from '../../core/storeHandler'
import * as actionCreators from '../action-creators'

import type { WatchdogRepr } from '../types'

export class Item {
  element: any;

  @bindable
  watchdog: WatchdogRepr;

  constructor (element: any) {
    this.element = element
  }

  removeWatchdog (id: number) {
    dispatch(actionCreators.watchdogActions.remove(id))
  }
}
