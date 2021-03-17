import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FridgeItemInstance } from '../data.model';

const DEFAULT_IMG_WIDTH = 640;
const DEFAULT_IMG_HEIGHT = 480;

@Component({
  selector: 'sfd-picture-pop-up',
  templateUrl: './picture-pop-up.component.html',
  styleUrls: ['./picture-pop-up.component.scss'],
})
export class PicturePopUpComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FridgeItemInstance[]) {}

  @ViewChild('popUpContainer') popUpContainer: ElementRef;
  imgWidgth = DEFAULT_IMG_WIDTH;
  imgHeight = DEFAULT_IMG_HEIGHT;

  instances = [];

  ngOnInit(): void {
    this.mapBoundaries();
  }

  mapBoundaries() {
    this.instances = this.data.map((instance) => {
      return {
        ...instance,
        top: instance.top * this.imgHeight,
        left: instance.left * this.imgWidgth,
        height: instance.height * this.imgHeight,
        width: instance.width * this.imgWidgth,
      };
    });
  }
}
