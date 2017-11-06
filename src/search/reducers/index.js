/* @flow */
'use strict'

import { combineReducers } from 'redux'

import gigReducer from './gigReducer'
import filterReducer from './filterReducer'
import paginationReducer from './paginationReducer'

export default combineReducers({
  gig: gigReducer,
  filter: filterReducer,
  pagination: paginationReducer
})
