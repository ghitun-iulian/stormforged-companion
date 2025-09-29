import { CardDataTypes, GameResources, HexDataTypes } from '@common/interfaces';
import { CollectionItem } from '@common/ui/collection-select/collection.interface';

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
  backImage?: CollectionItem;
  bgImage?: CollectionItem;
  size?: string;
}

export interface AssetResources extends Partial<Record<GameResources, number>> { }
