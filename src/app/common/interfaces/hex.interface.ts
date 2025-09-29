import { CollectionItem, CollectionItem2 } from '@common/ui/collection-select/collection.interface';
import { GameResources, HexIndexDial, ResourceItem } from './';

export enum HexDataTypes {
  RESOURCE = 'resource',
  EXPLORATION = 'exploration',
  TRACKER = 'tracker',
  LOCATION = 'location',
  PLATFORM = 'platform',
}

export interface ResourceHexData {
  resources: ResourceItem[];
  color: string;
}

export interface ExplorationHexData {
  icon: CollectionItem2;
  color: string;
}

export interface TrackerHexData {
  dial: HexIndexDial;
  icon: CollectionItem;
  color: string;
}

export interface LocationHexData {
  icon?: CollectionItem;
  color: string;
  dockingPoints: HexIndexDial;
  minorReward: ResourceItem[];
  majorReward: ResourceItem[];
}

export interface PlatformHexData {
  level: number;
  icon: CollectionItem;
  color: string;
  dial: Array<'' | 'minor' | 'major'>;
}
