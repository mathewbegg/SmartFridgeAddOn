import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FridgeItemInstance } from '../data.model';

@Component({
  selector: 'sfd-picture-pop-up',
  templateUrl: './picture-pop-up.component.html',
  styleUrls: ['./picture-pop-up.component.scss'],
})
export class PicturePopUpComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public instances: FridgeItemInstance[]
  ) {}

  ngOnInit(): void {}
}
