import { Loader } from './loader';

export class AppLoader extends Loader {
  constructor() {
    super('https://rss-news-api.onrender.com/', {
      apiKey: 'a110b858782643e69538761c75334b8c',
    });
  }
}
