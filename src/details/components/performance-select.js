/* @flow */
'use strict'

import { bindable } from 'aurelia-framework'

import { dispatch } from '../../core/storeHandler'
import * as actionCreators from '../action-creators'

import type { Performance } from '../../core/types'

export class PerformanceSelect {
  element: any;

  @bindable
  performances: Array<Performance>;

  @bindable
  selectedId: number;

  constructor (element: any) {
    this.element = element
  }

  selectPerformance (id: number) {
    dispatch(actionCreators.selectionActions.selectPerformance(id))
  }
}
