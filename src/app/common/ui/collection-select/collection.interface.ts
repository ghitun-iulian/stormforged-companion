
export const collectionPath = '/assets/collection/';

export enum CollectionType {
    BACKGROUND = 'background',
    ICON = 'icon',
    ART = 'art',
}

export interface CollectionItem {
    path: string;
    label: string;
    type: CollectionType | null;
    filetype: string;
}

export interface CollectionGroup {
    label: string;
    items: CollectionItem[];
}

export interface CollectionFilters {
    search: string;
    type: CollectionType | '';
}