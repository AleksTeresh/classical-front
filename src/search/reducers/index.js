/* @flow */
'use strict'

import { combineReducers } from 'redux'

import gigReducer from './gigReducer'
import filterReducer from './filterReducer'

export default combineReducers({
  gig: gigReducer,
  filter: filterReducer
})
