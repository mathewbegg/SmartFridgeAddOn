import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FridgeItemInstance } from '../data.model';

const IMG_WIDTH = 640;
const IMG_HEIGHT = 480;

@Component({
  selector: 'sfd-picture-pop-up',
  templateUrl: './picture-pop-up.component.html',
  styleUrls: ['./picture-pop-up.component.scss'],
})
export class PicturePopUpComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FridgeItemInstance[]) {}

  instances = [];

  ngOnInit(): void {
    this.instances = this.data.map((instance) => {
      return {
        ...instance,
        top: instance.top * IMG_HEIGHT,
        left: instance.left * IMG_WIDTH,
        height: instance.height * IMG_HEIGHT,
        width: instance.width * IMG_WIDTH,
      };
    });
  }
}
