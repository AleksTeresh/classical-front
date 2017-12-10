/* @flow */
'use strict'
import { PLATFORM } from 'aurelia-framework'

import 'bootstrap-datepicker'

import { coreActionCreators } from './core/action-creators'
import { dispatch } from './core/storeHandler'

import { checkToken, removeToken } from './core/lib/token-utils'
import * as client from './core/client'

export class App {
  router: any;

  async configureRouter (config: any, router: any) {
    await checkUserIsValid()

    loadCoreEntities()

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
    return checkToken()
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
    removeToken()
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

function loadCoreEntities () {
  dispatch(coreActionCreators.loadVenues())
  dispatch(coreActionCreators.loadAuthors())
  dispatch(coreActionCreators.loadGenres())
}

async function checkUserIsValid () {
  try {
    let result = await client.fetchGigs('', 1)
    if (result.status >= 400) {
      removeToken()
    }
  } catch (e) {
    removeToken()
  }
}

export function continueBootstrapping () {
  coreEntitiesReady = true
}
