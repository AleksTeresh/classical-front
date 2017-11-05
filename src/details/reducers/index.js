/* @flow */
'use strict'

import { combineReducers } from 'redux'

import gig from './gigReducer'
import suggestions from './suggestionReducer'

export default combineReducers({
  gig,
  suggestions
})
