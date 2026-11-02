export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export type HttpMethod = 'GET' | 'POST';

export type ResponseStatus = 'ok' | 'error';

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export type SourceItem = Pick<Source, 'id' | 'name'>;

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: ResponseStatus;
    sources: Source[];
}

export interface NewsResponse {
    status: ResponseStatus;
    totalResults: number;
    articles: Article[];
}

export interface QueryOptions {
    apiKey: string;
    sources: string;
}

export interface RequestParams {
    endpoint: Endpoint;
    options?: Partial<QueryOptions>;
    signal?: AbortSignal;
    onError?: () => void;
}

export type Callback<T> = (data: T) => void;
