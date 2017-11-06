/* @flow */
'use strict'
import { PLATFORM } from 'aurelia-framework'

import { coreActionCreators } from './core/action-creators'
import { dispatch } from './core/storeHandler'

export class App {
  router: any;

  constructor () {
    dispatch(coreActionCreators.loadVenues())
    dispatch(coreActionCreators.loadAuthors())
    dispatch(coreActionCreators.loadGenres())
  }

  configureRouter (config: any, router: any) {
    config.title = 'Classical'
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('./search/search'), title: 'Search' },
      { route: 'gigs/:id', moduleId: PLATFORM.moduleName('./details/details'), name: 'details' }
    ])

    this.router = router
  }
}
