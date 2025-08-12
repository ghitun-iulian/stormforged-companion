export enum AssetType {
  HEX = 'hex',
  CARD = 'card',
}

export interface Asset<T> {
  id?: string;
  label: string;
  data: T;
}

export interface ResourceHexTile {
  type: AssetType.HEX;
}

export interface ResourceCardTile {
  type: AssetType.CARD;
}
