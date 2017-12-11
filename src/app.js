/* @flow */
/* global window */
'use strict'
import { PLATFORM } from 'aurelia-framework'

import 'bootstrap-datepicker'

import { coreActionCreators } from './core/action-creators'
import { dispatch } from './core/storeHandler'

import { TokenUtils } from './core/lib'
import * as client from './core/client'

export class App {
  router: any;

  async configureRouter (config: any, router: any) {
    await checkUserIsValid()

    loadCoreEntities()

    await waitForCoreEntitiesToLoad()

    config.title = 'Classical'
    // resets the page scroll after navigating to abother route
    config.addPipelineStep('postcomplete', PostCompleteStep)
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('./search/search'), title: 'Search', name: 'search', nav: true, settings: { noScrollToTop: false } },
      { route: 'gigs/:id', moduleId: PLATFORM.moduleName('./details/details'), name: 'details', nav: true, href: '#gigs', settings: { noScrollToTop: false } },
      { route: 'register', moduleId: PLATFORM.moduleName('./register/register'), name: 'register', nav: true, settings: { noScrollToTop: false } },
      { route: 'login', moduleId: PLATFORM.moduleName('./login/login'), name: 'login', nav: true, settings: { noScrollToTop: false } },
      { route: 'watchdogs', moduleId: PLATFORM.moduleName('./watchdog/watchdog'), name: 'watchdogs', nav: true, settings: { noScrollToTop: false } }
    ])

    this.router = router
  }

  get isLoggedIn (): boolean {
    return TokenUtils.checkToken()
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
    TokenUtils.removeToken()
  }
}

class PostCompleteStep {
  run (instruction, next) {
    if (!instruction.config.settings.noScrollToTop) {
      window.scrollTo(0, 0)
    }

    return next()
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
      TokenUtils.removeToken()
    }
  } catch (e) {
    TokenUtils.removeToken()
  }
}

export function continueBootstrapping () {
  coreEntitiesReady = true
}
