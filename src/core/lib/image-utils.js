/* @flow */
'use strict'

export function isImageUrlValid (url?: string): boolean {
  return url !== null && url !== undefined &&
    (
      url.includes('jpg') ||
      url.includes('JPG') ||
      url.includes('png') ||
      url.includes('PNG') ||
      url.includes('jpeg') ||
      url.includes('JPEG') ||
      url.includes('gif') ||
      url.includes('GIF')
    )
}
