/* @flow */
'use strict'

import type { SearchAction } from './search/actions'
import type { CoreAction } from './core/actions'

export type Action
  = SearchAction
  | CoreAction
