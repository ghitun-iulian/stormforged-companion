import { GameResources, HexIndexDial } from '@common/interfaces';

export enum HexDataTypes {
  RESOURCE = 'resource',
  EXPLORATION = 'exploration',
  TRACKER = 'tracker',
  LOCATION = 'location',
  PLATFORM = 'platform',
}

export interface ResourceHex {
  resources: GameResources[];
}

export interface ExplorationHex {
  icon: string;
}

export interface TrackerHex {
  dial: number[];
  icon: string;
}

export interface LocationHex {
  icon: string;
  dockingPoints: HexIndexDial;
  minorReward: string[];
  majorReward: string[];
}

export interface PlatformHex {
  level: number;
  icon: string;
  dial: Array<'' | 'minor' | 'major'>;
}
