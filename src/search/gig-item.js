/* @flow */
'use strict'

import { bindable } from 'aurelia-framework'

import type { Gig } from '../core/types'

export default class GigItem {
  @bindable gig: Gig

  constructor (gig: Gig) {
    this.gig = gig
  }
}
