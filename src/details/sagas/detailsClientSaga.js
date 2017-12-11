/* @flow */
/* global Generator */
'use strict'

import moment from 'moment'

import { call, put, takeEvery } from 'redux-saga/effects'

import defaultImage from '../../../static/classical.jpg'

import * as client from '../../core/client'
import { ImageUtils } from '../../core/lib'

import type { Gig } from '../../core/types'

function * fetchGig (
  action: { type: 'details-gig-load-request', id: number }
): Generator<any, any, any> {
  try {
    let gig = yield call(client.fetchGig, action.id)

    // fetch suggestions
    let sameAuthorGigs = (yield call(
      client.fetchGigs,
      '',
      30,
      0,
      gig.performances
        // make sure to exclude "No author" author option, to avoid unwanted suggestions
        .filter((p) => {
          return p.author.name !== 'No author' && p.author.id !== 1
        })
        .map((p) => p.author.id),
      null,
      null,
      moment().format('YYYY-MM-DD'),
      moment().add(1, 'y').format('YYYY-MM-DD')
    )).gigs

    // make sure the main gig itself is not among them
    sameAuthorGigs = filterAndSortSuggestions(gig, sameAuthorGigs)
    // get only 3 of the suggestions
      .slice(0, 3)
      .map((p) => {
        // substitute an image url with the default one, if it is non-existent or invalid
        if (!ImageUtils.isImageUrlValid(p.imageUrl)) {
          return {
            ...p,
            imageUrl: defaultImage
          }
        }

        return p
      })

    // substitute an image url with the default one, if it is non-existent or invalid
    if (!ImageUtils.isImageUrlValid(gig.imageUrl)) {
      gig.imageUrl = defaultImage
    }

    yield put({
      type: 'details-gig-load-success',
      gig: gig,
      suggestions: sameAuthorGigs.slice(0, 3)
    })
    if (gig.performances.length > 0) {
      yield put({
        type: 'details-performance-select',
        id: gig.performances[0].id
      })
    }
  } catch (e) {
    console.error(e)

    yield put({ type: 'details-gig-load-failure' })
  }
}

function * detailsClientSaga (): Generator<any, any, any> {
  yield takeEvery('details-gig-load-request', fetchGig)
}

function filterAndSortSuggestions (
  detailedGig: Gig,
  sameAuthorGigs: Array<Gig>
): Array<Gig> {
  sameAuthorGigs = sameAuthorGigs.filter((p) => p.id !== detailedGig.id)
  sameAuthorGigs.sort((a, b) => {
    if (a.venue.id === b.venue.id) {
      return 0
    }

    if (
      a.venue.id === detailedGig.venue.id && b.venue.id !== detailedGig.venue.id
    ) {
      return -1
    }

    return 1
  })

  return sameAuthorGigs
}

export default detailsClientSaga
