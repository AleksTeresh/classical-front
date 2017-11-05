/* @flow */
'use strict'

import { combineReducers } from 'redux'

import search from '../search/reducers'
import core from '../core/reducers'
import details from '../details/reducers'

export default combineReducers({
  search,
  core,
  details
})
