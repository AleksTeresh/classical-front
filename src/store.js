/* @flow */
'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer'
import { searchClientSaga } from './search/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// const initialState = {}
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

// then run the saga
sagaMiddleware.run(searchClientSaga)

export default store
