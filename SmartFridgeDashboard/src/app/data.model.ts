export interface FridgeDataModel {
  Items: FridgeItem[];
}

export interface FridgeItem {
  Name: string;
  Instances: FridgeItemInstance;
}

export interface FridgeItemInstance {
  top: number;
  left: number;
  height: number;
  width: number;
}
