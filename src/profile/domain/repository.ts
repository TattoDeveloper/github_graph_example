export interface Repository{
    id: string;
    name: string;
    url: string;
    viewerHasStarred: boolean;
    isPrivate: boolean;
    primaryLanguage: any;
    isFavorite: boolean;
}