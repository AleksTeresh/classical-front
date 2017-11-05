/* @flow */
'use strict'

import type { SearchAction } from './search/actions'
import type { DetailsAction } from './details/actions'
import type { CoreAction } from './core/actions'

export type Action
  = SearchAction
  | DetailsAction
  | CoreAction
