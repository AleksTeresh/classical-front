/* @flow */
'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer'
import { searchClientSaga } from './search/sagas'
import { detailsClientSaga } from './details/sagas'
import { coreClientSaga } from './core/sagas'
import { registerClientSaga } from './register/sagas'
import { loginClientSaga } from './login/sagas'
import { watchdogClientSaga } from './watchdog/sagas'

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
sagaMiddleware.run(registerClientSaga)
sagaMiddleware.run(loginClientSaga)
sagaMiddleware.run(watchdogClientSaga)

export default store
