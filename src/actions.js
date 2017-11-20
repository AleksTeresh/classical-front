/* @flow */
'use strict'

import type { SearchAction } from './search/actions'
import type { DetailsAction } from './details/actions'
import type { CoreAction } from './core/actions'
import type { RegisterAction } from './register/actions'
import type { LoginAction } from './login/actions'
import type { WatchdogAction } from './watchdog/actions'

export type Action
  = SearchAction
  | DetailsAction
  | CoreAction
  | RegisterAction
  | LoginAction
  | WatchdogAction
