import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { FridgeDataModel, FridgeItem } from '../data.model';
import { DataService } from '../data.service';
import { PicturePopUpComponent } from '../picture-pop-up/picture-pop-up.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'sfd-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private dataService: DataService, public dialog: MatDialog) {}

  data: FridgeDataModel;
  displayedColumns: string[] = ['Name', 'Amount'];
  dataSource = new MatTableDataSource<FridgeItem>([]);
  popUpRef: MatDialogRef<PicturePopUpComponent>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataService.getItems().subscribe((data: FridgeDataModel) => {
      this.data = data;
      this.dataSource = new MatTableDataSource<FridgeItem>(data.Items);
    });
  }

  openPicturePopUp(instances) {
    this.popUpRef = this.dialog.open(PicturePopUpComponent, {
      data: instances,
    });
  }
}
