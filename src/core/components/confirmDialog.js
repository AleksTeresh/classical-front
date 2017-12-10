/* @flow */
'use strict'

import { inject } from 'aurelia-framework'
import { DialogController } from 'aurelia-dialog'

type DialogModel = {
  heading: string,
  content: string,
  isCancelable: boolean
}

@inject(DialogController)
export class ConfirmDialog {
  heading: string;
  content: string;
  isCancelable: boolean;

  controller: any;

  constructor (controller: any) {
    this.controller = controller
  }

  activate ({
    heading,
    content,
    isCancelable = false
  }: DialogModel) {
    this.heading = heading
    this.content = content
    this.isCancelable = isCancelable
  }
 }
