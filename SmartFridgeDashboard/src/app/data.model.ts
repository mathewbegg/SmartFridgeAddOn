export interface FridgeDataModel {
  Data: FridgeItem[];
}

export interface FridgeItem {
  Name: string;
  instances: FridgeItemInstance;
}

export interface FridgeItemInstance {
  top: number;
  left: number;
  height: number;
  width: number;
}
