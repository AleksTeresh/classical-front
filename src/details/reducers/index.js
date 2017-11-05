/* @flow */
'use strict'

import { combineReducers } from 'redux'

import gig from './gigReducer'
import suggestions from './suggestionReducer'
import selection from './selectionReducer'

export default combineReducers({
  gig,
  suggestions,
  selection
})
