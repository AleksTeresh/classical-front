/* @flow */
/* global Generator */
'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import defaultImage from '../../../static/classical.jpg'

import * as client from '../../core/client'
import { ImageUtils } from '../../core/lib'

import type { DetailedGig } from '../../core/types'

function * likePerformance (
  action: { type: 'details-performance-like-request', id: number }
): Generator<any, any, any> {
  try {
    const response = yield call(client.likePerformance, action.id)

    if (response.ok) {
      yield put({
        type: 'details-performance-like-success',
        performanceId: action.id
      })
    } else {
      yield put({ type: 'details-performance-like-failure' })
    }
  } catch (e) {
    console.error(e)
    yield put({ type: 'details-performance-like-failure' })
  }
}

function * fetchGig (
  action: { type: 'details-gig-load-request', id: number }
): Generator<any, any, any> {
  try {
    let gigDetailsResponse = yield call(client.fetchGig, action.id)

    let suggestions = gigDetailsResponse.suggestions
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

    let detailedGig: DetailedGig = {
      ...gigDetailsResponse.gig,
      performances: gigDetailsResponse.performances
    }

    // substitute an image url with the default one, if it is non-existent or invalid
    if (!ImageUtils.isImageUrlValid(detailedGig.imageUrl)) {
      detailedGig.imageUrl = defaultImage
    }

    yield put({
      type: 'details-gig-load-success',
      gig: detailedGig,
      suggestions: suggestions
    })
    if (detailedGig.performances.length > 0) {
      yield put({
        type: 'details-performance-select',
        id: detailedGig.performances[0].id
      })
    }
  } catch (e) {
    console.error(e)

    yield put({ type: 'details-gig-load-failure' })
  }
}

function * detailsClientSaga (): Generator<any, any, any> {
  yield takeEvery('details-gig-load-request', fetchGig)
  yield takeEvery('details-performance-like-request', likePerformance)
}
/*
function getNumberOfMatchingGenres (
  performances: Array<Performance>,
  referencePerformances: Array<Performance>
): number {
  let counter = 0
  let matchedIndices = []

  referencePerformances.forEach((p: Performance, i: number) => {
    performances.forEach((s: Performance, idx: number) => {
      if (!matchedIndices.includes(idx)) {
        let genreMatch = false
        p.genres.forEach((p) => {
          if (s.genres.includes(p)) {
            genreMatch = true
            return false
          }
        })

        if (genreMatch) {
          matchedIndices.push(idx)
          counter++
        }
      }
    })
  })

  return counter
}
*/

/*
function filterSuggestions (
  detailedGig: Gig,
  sameAuthorGigs: Array<Gig>
): Array<Gig> {
  // make sure the main gig itself is not among them
  return sameAuthorGigs.filter((p) => p.id !== detailedGig.id)
}
*/
/**
* sort the gigs consifering 1) the venue 2) genre of performances 3) datatime
* the onces that are more similar to the currently views gig, go first
**/
/*
function sortSuggestions (
  detailedGig: Gig,
  sameAuthorGigs: Array<Gig>
): Array<Gig> {
  sameAuthorGigs.sort((a, b) => {
    // if the venues are the same or they are both not what the reference venue is,
    // procede to comparison by genre
    if (
      a.venue.id === b.venue.id ||
      (a.venue.id !== detailedGig.venue.id && b.venue.id !== detailedGig.venue.id)
    ) {
      // get "score" of how similar the a and b to the reference in terms of genre of performances
      const aGenreCount = getNumberOfMatchingGenres(
        a.performances,
        detailedGig.performances
      )
      const bGenreCount = getNumberOfMatchingGenres(
        b.performances,
        detailedGig.performances
      )

      // if the genre scores are the same, compare by closeness of the datetime
      if (aGenreCount === bGenreCount) {
        // if the reference does not have a timestamp, or a and b both do not have it;
        // a and b are equal
        if (!detailedGig.timestamp || (!a.timestamp && !b.timestamp)) {
          return 0
        }

        // if only a does not have a timestamp, b goes first
        if (!a.timestamp) {
          return 1
        }

        // if only b does not have a timestamp, a goes first
        if (!b.timestamp) {
          return -1
        }

        // if all the 3 gigs have the timestamps, sort based on date distance
        const aDateDistance = Math.abs(a.timestamp - detailedGig.timestamp)
        const bDateDistance = Math.abs(b.timestamp - detailedGig.timestamp)

        if (aDateDistance === bDateDistance) {
          return 0
        }

        if (aDateDistance > bDateDistance) {
          return 1
        }

        return -1
      }

      if (aGenreCount > bGenreCount) {
        return -1
      }

      return 1
    }

    // the gig wi the same venue as the reference goes first
    if (
      a.venue.id === detailedGig.venue.id && b.venue.id !== detailedGig.venue.id
    ) {
      return -1
    }

    return 1
  })

  return sameAuthorGigs
}
*/
export default detailsClientSaga
