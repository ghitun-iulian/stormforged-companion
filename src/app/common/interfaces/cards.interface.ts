import { AssetResources, GameResources, ResourceItem } from '@common/interfaces';
import { CollectionItem } from '@common/ui/collection-select/collection.interface';


export enum CardDataTypes {
  RESOURCE = 'resource',
  EVENT = 'event',
  STORM = 'storm',
  RELIC = 'relic',
}

export interface ResourceCardData {
  resource: GameResources;
  color?: string;
}

export interface EventCardData {
  title: string;
  art: CollectionItem;
  description: string;
}

export interface StormCardData {
  title: string;
  art: CollectionItem;
  description: string;
}

export interface RelicCardData {
  title: string;
  art: CollectionItem;
  description: string;
  disassemble: ResourceItem[];
  isPassive: boolean;
}
