import { Component, OnInit } from '@angular/core';
import { FridgeDataModel, FridgeItem } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'sfd-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss'],
})
export class GridListComponent implements OnInit {
  constructor(private dataService: DataService) {}

  items: FridgeItem[];
  displayItems: FridgeItem[];
  filterString = '';

  ngOnInit(): void {
    this.dataService.getItems().subscribe((data: FridgeDataModel) => {
      this.items = data.Items;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.filterString.length) {
      this.displayItems = this.items.filter((item) =>
        item.Name.match(this.filterString)
      );
    } else {
      this.displayItems = this.items;
    }
    this.displayItems.sort(alphaSort);
  }

  getShade(confidence: number) {
    const floor = 0.25;
    const alpha = floor + (1 - floor) * confidence;
    return 'rgba(202,185,233,' + alpha + ')';
  }
}

function alphaSort(a: FridgeItem, b: FridgeItem) {
  if (a.Name >= b.Name) return 1;
  if (a.Name < b.Name) return -1;
  return 0;
}
