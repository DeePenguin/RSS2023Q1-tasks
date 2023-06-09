export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface NewsArticle {
  source: Pick<Source, 'id' | 'name'>;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ApiResponse {
  status: string; // change to enum
}


export interface NewsResponse extends ApiResponse {
  totalResults: number;
  articles: NewsArticle[];
}

export interface SourcesResponse extends ApiResponse {
  sources: Source[];
}

export enum RequestsMethods {
  GET = 'GET',
  POST = 'POST',
}

export enum EndPoints {
  sources = 'sources',
  everything = 'everything',
}

export type RequestOptions = {
  sources?: string;
}
