/* @flow */
'use strict'

import { combineReducers } from 'redux'

import input from './inputReducer'
import confirm from './confirmReducer'

export default combineReducers({
  input,
  confirm
})
