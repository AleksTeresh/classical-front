/* @flow */
'use strict'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import type { SearchState } from './types'
import type { AppState } from '../types'

export class Search {
  search: SearchState

  constructor () {
    subscribe(this.update.bind(this))

    this.search = getState().search
  }

  created () {
    dispatch(actionCreators.gigActions.load())
  }

  editSearch (value: string) {
    console.log(value)
    dispatch(actionCreators.filterActions.editSearch(value))
  }

  update (state: AppState) {
    this.search = state.search
  }
}
