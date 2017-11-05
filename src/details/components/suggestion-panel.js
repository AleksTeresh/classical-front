/* @flow */
'use strict'

import { bindable } from 'aurelia-framework'

import type { Gig } from '../../core/types'

export class SuggestionPanel {
  @bindable
  suggestions: Array<Gig>;
}
