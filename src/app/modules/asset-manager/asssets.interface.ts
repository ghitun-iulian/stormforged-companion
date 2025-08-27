import { CardDataTypes, HexDataTypes } from '@common/interfaces';

export enum AssetShape {
  HEX = 'hex',
  CARD = 'card',
}

export interface AssetFilters {
  search: string;
  shape: AssetShape | '';
  type: CardDataTypes | HexDataTypes | '';
}

export interface Asset<T> {
  id?: string;
  shape: null | AssetShape;
  type: null | CardDataTypes | HexDataTypes;
  metadata: AssetMetadata;
  data: T;
}

export interface AssetMetadata {
  label: string;
  description?: string;
  printQty: number;
  backImage?: string;
  bgImage?: string;
  size?: string;
}

export interface CollectionItem {
  path: string;
  label: string;
  type: AssetShape;
  filetype: string;
}

export interface CollectionGroup {
  label: string;
  items: CollectionItem[];
}
