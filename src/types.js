/* @flow */
'use strict'

import type { SearchState } from './search/types'
import type { CoreState } from './core/types'
import type { DetailsState } from './details/types'
import type { RegisterState } from './register/types'
import type { LoginState } from './login/types'
import type { WatchdogState } from './watchdog/types'

export type AppState = {
  search: SearchState,
  core: CoreState,
  details: DetailsState,
  register: RegisterState,
  login: LoginState,
  watchdog: WatchdogState
}
