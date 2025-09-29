
export enum HexDialIndexes {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}


export type HexIndexDial = (string | number)[];

export const primaryColor = '#2e3142'
export const accentColor = '#bf935f'
export const maxResources = 9;

export enum GameResources {
  WOOD = 'wood',
  SCRAP = 'scrap',
  STEEL = 'steel',
  ELECTRONICS = 'electronics',
  BIOMASS = 'biomass',
  CHEMS = 'chems',
  RELIC = 'relic',
}

export interface ResourceItem {
  label: GameResources;
  value: number;
}