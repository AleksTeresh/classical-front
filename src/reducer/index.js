/* @flow */
'use strict'

import { combineReducers } from 'redux'

import search from '../search/reducers'
import core from '../core/reducers'

export default combineReducers({
  search,
  core
})
