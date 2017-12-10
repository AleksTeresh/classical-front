/* @flow */
'use strict'

import { combineReducers } from 'redux'

import watchdog from './watchdogReducer'
import confirm from './confirmReducer'

export default combineReducers({
  watchdog,
  confirm
})
