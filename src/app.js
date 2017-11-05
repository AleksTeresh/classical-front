/* @flow */
'use strict'

import { PLATFORM } from 'aurelia-framework'

export class App {
  router: any;

  configureRouter (config: any, router: any) {
    config.title = 'Classical'
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('./search/search'), title: 'Search' },
      { route: 'gigs/:id', moduleId: PLATFORM.moduleName('./details/details'), name: 'details' }
    ])

    this.router = router
  }
}
