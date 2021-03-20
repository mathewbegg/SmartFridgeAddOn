export interface FridgeDataModel {
  Items: FridgeItem[];
}

export interface FridgeItem {
  Name: string;
  Confidence: number;
  color?: string;
}
