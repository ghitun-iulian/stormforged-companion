
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

export interface GraphicsConfig {
    renderAs?: 'svg' | 'img' | 'background' | 'element';
    width?: string | number | null;
    height?: string | number | null;
    preserveAspectRatio?: boolean;
    cssClass?: string | null;
    altText?: string | null;
    backgroundSize?: 'cover' | 'contain' | 'auto';
    overrideColor?: string;
}

export const DEFAULT_GRAPHICS_CONFIG: GraphicsConfig = {
    renderAs: 'svg',
    width: null,
    height: null,
    preserveAspectRatio: true,
    cssClass: 'graphic-element',
    altText: null,
    backgroundSize: 'contain',
};

export interface CollectionItem2 {
    type: CollectionType;
    label: string;
    filetype: string;
    color: string;
}

export interface CollectionGroup {
    label: string;
    items: CollectionItem[];
}

export interface CollectionFilters {
    search: string;
    type: CollectionType | '';
}