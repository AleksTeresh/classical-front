/* @flow */
'use strict'

import { Aurelia } from 'aurelia-framework'

import environment from './environment'
import { PLATFORM } from 'aurelia-pal'
import 'babel-polyfill'
import 'bootstrap-select/dist/js/bootstrap-select.min.js'
import * as Bluebird from 'bluebird'

import moment from 'moment-timezone'
moment.tz.setDefault('UTC')

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } })

export function configure (aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    // .plugin(PLATFORM.moduleName('aurelia-ux'))

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging()
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'))
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')))
}
