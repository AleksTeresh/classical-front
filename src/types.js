/* @flow */
'use strict'

import type { SearchState } from './search/types'
import type { CoreState } from './core/types'

export type AppState = {
  search: SearchState,
  core: CoreState
}
