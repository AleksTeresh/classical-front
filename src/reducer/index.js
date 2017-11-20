/* @flow */
'use strict'

import { combineReducers } from 'redux'

import search from '../search/reducers'
import core from '../core/reducers'
import details from '../details/reducers'
import register from '../register/reducers'
import login from '../login/reducers'

export default combineReducers({
  search,
  core,
  details,
  register,
  login
})
