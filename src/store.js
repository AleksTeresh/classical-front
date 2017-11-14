/* @flow */
'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer'
import { searchClientSaga } from './search/sagas'
import { detailsClientSaga } from './details/sagas'
import { coreClientSaga } from './core/sagas'

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
sagaMiddleware.run(detailsClientSaga)
sagaMiddleware.run(coreClientSaga)

export default store
