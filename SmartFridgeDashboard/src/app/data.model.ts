export interface FridgeDataModel {
  Items: FridgeItem[];
}

export interface FridgeItem {
  Name: string;
  Confidence: number;
  color?: string;
}

export interface FridgeItemSortOption {
  display: string;
  sortFunction: (a: FridgeItem, b: FridgeItem) => 1 | -1 | 0;
}
