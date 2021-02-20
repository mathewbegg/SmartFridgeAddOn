import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { FridgeDataModel, FridgeItem } from '../data.model';
import { DataService } from '../data.service';

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
  constructor(
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  data: FridgeDataModel;

  displayedColumns: string[] = ['Name', 'Amount'];
  dataSource = new MatTableDataSource<FridgeItem>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.changeDetectorRef.detectChanges(); //required when working with amplify + matInput
  }

  ngOnInit(): void {
    this.dataService.getItems().subscribe((data: FridgeDataModel) => {
      this.data = data;
      this.dataSource = new MatTableDataSource<FridgeItem>(data.Items);
      this.changeDetectorRef.detectChanges();
    });
  }
}
