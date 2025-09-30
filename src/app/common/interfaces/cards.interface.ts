import { ResourceItem } from '@common/interfaces';
import { CollectionItem, CollectionItem2 } from '@common/ui/collection-select/collection.interface';


export enum CardDataTypes {
  RESOURCE = 'resource',
  EVENT = 'event',
  STORM = 'storm',
  RELIC = 'relic',
}

export interface ResourceCardData {
  resource: CollectionItem2;
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
