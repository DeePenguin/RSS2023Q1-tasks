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

export enum ApiResponceStatus {
  OK = 'ok',
  ERROR = 'error',
}
export interface ApiResponse {
  status: ApiResponceStatus;
  code?: string;
  message?: string;
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

export enum SourcesCountries {
  ar = 'Argentina',
  au = 'Australia',
  br = 'Brazil',
  ca = 'Canada',
  de = 'Germany',
  es = 'Spain',
  fr = 'France',
  gb = 'United Kingdom',
  ie = 'Ireland',
  in = 'India',
  is = 'Israel',
  it = 'Italy',
  nl = 'Netherlands',
  no = 'Norway',
  pk = 'Pakistan',
  ru = 'Russia',
  sa = 'Saudi Arabia',
  se = 'Sweden',
  us = 'United States',
  za = 'South Africa',
  zh = 'China',
}

export enum SourcesCategories {
  business = 'business',
  entertainment = 'entertainment',
  general = 'general',
  health = 'health',
  science = 'science',
  sports = 'sports',
  technology = 'technology',
}

export enum SourcesLanguages {
  ar = 'Arabic',
  de = 'German',
  en = 'English',
  es = 'Spanish',
  fr = 'French',
  he = 'Hebrew',
  it = 'Italian',
  nl = 'Dutch',
  no = 'Norwegian',
  pt = 'Portuguese',
  ru = 'Russian',
  sv = 'Swedish',
  ud = 'Urdu',
  zh = 'Chinese',
}

export type ValidFilters = 'country' | 'category' | 'language';

export interface SourcesFilter {
  [key: ValidFilters | string] : Record<string, Source[]>
}
