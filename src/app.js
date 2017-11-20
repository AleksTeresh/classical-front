/* @flow */
'use strict'
import { PLATFORM } from 'aurelia-framework'

import 'bootstrap-datepicker'

import { coreActionCreators } from './core/action-creators'
import { dispatch } from './core/storeHandler'

export class App {
  router: any;

  constructor () {
    dispatch(coreActionCreators.loadVenues())
    dispatch(coreActionCreators.loadAuthors())
    dispatch(coreActionCreators.loadGenres())
  }

  async configureRouter (config: any, router: any) {
    await waitForCoreEntitiesToLoad()

    config.title = 'Classical'
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('./search/search'), title: 'Search', name: 'search' },
      { route: 'gigs/:id', moduleId: PLATFORM.moduleName('./details/details'), name: 'details' },
      { route: 'register', moduleId: PLATFORM.moduleName('./register/register'), name: 'register' },
      { route: 'login', moduleId: PLATFORM.moduleName('./login/login'), name: 'login' },
      { route: 'watchdogs', moduleId: PLATFORM.moduleName('./watchdog/watchdog'), name: 'watchdogs' }
    ])

    this.router = router
  }

  get isLoggedIn (): boolean {
    return window.localStorage.getItem('token')
  }

  navigateToLoginPage () {
    if (
      !window.localStorage.getItem('token') &&
      this.router.currentInstruction.config.title !== 'login'
    ) {
      this.router.navigate('login')
    }
  }

  signout () {
    window.localStorage.removeItem('token')
  }
}

let coreEntitiesReady = false

function waitForCoreEntitiesToLoad () {
  return new Promise(resolve =>
    setInterval(() => {
      if (coreEntitiesReady) resolve()
    },
    200))
}

export function continueBootstrapping () {
  coreEntitiesReady = true
}
