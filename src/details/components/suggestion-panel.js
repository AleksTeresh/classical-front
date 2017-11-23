/* @flow */
'use strict'

import { Router } from 'aurelia-router'
import { bindable, inject } from 'aurelia-framework'

import type { Gig } from '../../core/types'

@inject(Router)
export class SuggestionPanel {
  @bindable
  suggestions: Array<Gig>;

  router: any;

  constructor (router: any) {
    this.router = router
  }

  navigateToGig (gigId: number) {
    this.router.navigateToRoute('details', { id: gigId })
  }
}
