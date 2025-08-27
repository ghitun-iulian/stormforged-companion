import { GameResources } from '@common/interfaces';

export enum Decks {
  RESOURCES = 'resources',
  RELICS = 'relics',
  EVENTS = 'events',
  STORM = 'storm',
}

export enum CardDataTypes {
  RESOURCE = 'resource',
  EVENT = 'event',
  STORM = 'storm',
  RELIC = 'relic',
}

export interface ResourceCard {
  deck: Decks.RESOURCES;
  resource: GameResources;
  bgImage: string;
}

export interface MapEventCard {
  deck: Decks.EVENTS;
  title: string;
  art: string;
  description: string;
}

export interface StormEventCard {
  deck: Decks.STORM;
  title: string;
  art: string;
  description: string;
}

export interface RelicCard {
  deck: Decks.RELICS;
  title: string;
  art: string;
  description: string;
  disassemble: GameResources[];
  isPassive: boolean;
}
