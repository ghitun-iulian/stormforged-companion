import { GameResources, HexIndexDial } from '@common/interfaces';

export enum HexDataTypes {
  RESOURCE = 'resource',
  EXPLORATION = 'exploration',
  TRACKER = 'tracker',
  LOCATION = 'location',
  PLATFORM = 'platform',
}

export interface ResourceHex {
  bgImage?: string;
  resources: GameResources[];
}

export interface ExplorationHex {
  bgImage?: string;
  icon: string;
}

export interface TrackerHex {
  bgImage?: string;
  dial: number[];
  icon: string;
}

export interface LocationHex {
  bgImage?: string;
  icon: string;
  dockingPoints: HexIndexDial;
  minorReward: string[];
  majorReward: string[];
}

export interface PlatformHex {
  bgImage?: string;
  level: number;
  icon: string;
  dial: Array<'' | 'minor' | 'major'>;
}
