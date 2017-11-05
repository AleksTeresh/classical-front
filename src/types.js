/* @flow */
'use strict'

import type { SearchState } from './search/types'
import type { CoreState } from './core/types'
import type { DetailsState } from './details/types'

export type AppState = {
  search: SearchState,
  core: CoreState,
  details: DetailsState
}
