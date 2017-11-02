/* @flow */
'use strict'

import { List } from 'immutable'

import { inject } from 'aurelia-framework'

import * as client from '../core/client'

import type { Gig } from '../core/types'

@inject(client)
export class Search {
  gigs: List<Gig>;
  client: any;

  constructor(client: any) {
    this.gigs = List()
    this.client = client
  }

  created() {
    this.client.fetchGigs()
      .then(gigs => this.gigs = gigs)
  }
}
