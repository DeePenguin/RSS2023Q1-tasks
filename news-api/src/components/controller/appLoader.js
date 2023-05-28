import Loader from './loader.js';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'a110b858782643e69538761c75334b8c', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
