/* @flow */
/* global Element */
'use strict'

import { customAttribute, bindable, inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'

@inject(Element, Router)
@customAttribute('link')
export class Link {
  @bindable route: string;
  @bindable params: any;

  element: any;
  router: any;

  constructor (element: any, router: any) {
    this.element = element
    this.router = router
  }

  attached () {
    this.element.addEventListener('click', (ev) => {
      // if (ev.target.id === this.element.id) {
      this.router.navigateToRoute(this.route, this.params)
      // }
    })
  }
}
