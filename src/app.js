/* @flow */
'use strict'
import { PLATFORM } from 'aurelia-framework'

import 'bootstrap-datepicker'

import { coreActionCreators } from './core/action-creators'
import { dispatch } from './core/storeHandler'

export class App {
  router: any;
/*
  constructor () {

  }
*/
  configureRouter (config: any, router: any) {
    config.title = 'Classical'
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('./search/search'), title: 'Search' },
      { route: 'gigs/:id', moduleId: PLATFORM.moduleName('./details/details'), name: 'details' },
      { route: 'register', moduleId: PLATFORM.moduleName('./register/register'), name: 'register' },
      { route: 'login', moduleId: PLATFORM.moduleName('./login/login'), name: 'login' }
    ])

    this.router = router
  }

  attached () {
    if (
      !window.localStorage.getItem('token') &&
      this.router.currentInstruction.config.name !== 'login'
    ) {
      console.log('here')
      this.router.navigate('login')
    }

    if (window.localStorage.getItem('token')) {
      dispatch(coreActionCreators.loadVenues())
      dispatch(coreActionCreators.loadAuthors())
      dispatch(coreActionCreators.loadGenres())
    }
  }

  signout () {
    window.localStorage.removeItem('token')
    this.router.navigate('login')
  }
}
