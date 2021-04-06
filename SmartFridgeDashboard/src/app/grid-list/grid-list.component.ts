import { Component, OnInit } from '@angular/core';
import {
  FridgeDataModel,
  FridgeItem,
  FridgeItemSortOption,
} from '../data.model';
import { DataService } from '../data.service';
import Fuse from 'fuse.js';

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
  showConfidence = true;

  sortOptions: FridgeItemSortOption[] = [
    {
      display: 'Name (A-Z)',
      sortFunction: alphaSort,
    },
    {
      display: 'Name (Z-A)',
      sortFunction: reverseAlphaSort,
    },
    {
      display: 'Confidence (High-Low)',
      sortFunction: confidenceSort,
    },
    {
      display: 'Confidence (Low-High)',
      sortFunction: reverseConfidenceSort,
    },
  ];

  currentSortOption = this.sortOptions[0];

  ngOnInit(): void {
    this.dataService.getItems().subscribe((data: FridgeDataModel) => {
      this.items = data.Items;
      this.applyFilter();
    });
  }

  changeSortFunction(sortOption: FridgeItemSortOption) {
    this.currentSortOption = sortOption;
    this.applyFilter();
  }

  applyFilter() {
    if (this.filterString.length) {
      const fuse = new Fuse<FridgeItem>(this.items, { keys: ['Name'] });
      console.log(fuse.search(this.filterString));
      this.displayItems = fuse
        .search(this.filterString)
        .map((result) => result.item);
    } else {
      this.displayItems = this.items;
    }
    this.displayItems.sort(this.currentSortOption.sortFunction);
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

function reverseAlphaSort(a: FridgeItem, b: FridgeItem) {
  if (a.Name >= b.Name) return -1;
  if (a.Name < b.Name) return 1;
  return 0;
}

function confidenceSort(a: FridgeItem, b: FridgeItem) {
  if (a.Confidence >= b.Confidence) return -1;
  if (a.Confidence < b.Confidence) return 1;
  return 0;
}

function reverseConfidenceSort(a: FridgeItem, b: FridgeItem) {
  if (a.Confidence >= b.Confidence) return 1;
  if (a.Confidence < b.Confidence) return -1;
  return 0;
}
