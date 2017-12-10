/* @flow */
'use strict'

import { inject } from 'aurelia-framework'
import { DialogService } from 'aurelia-dialog'

import { subscribe, dispatch, getState } from '../core/storeHandler'
import * as actionCreators from './action-creators'

import { ConfirmDialog } from '../core/components/confirmDialog'

import type { WatchdogViewState } from './types'
import type { Author, Venue, Genre } from '../core/types'
import type { AppState } from '../types'

@inject(DialogService)
export class Register {
  watchdogView: WatchdogViewState;

  authors: Array<Author>;
  venues: Array<Venue>;
  genres: Array<Genre>;

  dialogService: any;

  constructor (dialogService: any) {
    this.dialogService = dialogService

    subscribe(this.update.bind(this))

    this.watchdogView = getState().watchdogView

    dispatch(actionCreators.watchdogActions.fetch())
  }

  removeWatchdog (id: number) {
    dispatch(actionCreators.watchdogActions.remove(id))
  }

  getAuthorRepr (authorIds: Array<number>) {
    // allAuthorIds = this.authors.map((p) => p.id)

    return authorIds.map((p) => {
      const author = this.authors.filter((s) => s.id === p)[0]

      return author.name
    }).join(', ')

    // return preresult.substring(preresult.length - 2)
  }

  update (state: AppState) {
    console.log(this.watchdogView, state.watchdogView)
    if (this.watchdogView.confirm.watchdog !==
        state.watchdogView.confirm.watchdog) {
      let heading = ''
      let content = ''
      if (state.watchdogView.confirm.watchdog === 'success') {
        heading = 'Success'
        content = 'The watchdog has been successfully deleted.'
      } else if (state.watchdogView.confirm.watchdog === 'failure') {
        heading = 'Error'
        content = 'An error occurred while trying to delete the watchdog!'
      }

      if (heading !== '') {
        this.dialogService.open({
          viewModel: ConfirmDialog,
          model: { heading, content },
          lock: false
        })
        .then(response => {
          dispatch(actionCreators.watchdogActions.resetConfirm())
        })
      }
    }

    this.watchdogView = state.watchdogView

    this.authors = state.core.authors.authors
    this.genres = state.core.genres
    this.venues = state.core.venues
  }
}
