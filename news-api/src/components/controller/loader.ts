import { EndPoints, RequestsMethods, RequestOptions } from "../../types/types";

class Loader {
  constructor(
    private baseLink: string,
    private options: {apiKey: string}
    ) {}

   getResp<T>(
    { endpoint, options = {} }: {endpoint: EndPoints, options?: RequestOptions},
    callback: (data: T) => void,
  ) {
    this.load<T>(RequestsMethods.GET, endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: RequestOptions, endpoint: EndPoints) {
    const urlOptions: Record<string, string> = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  async getJson<T>(url: string, method: RequestsMethods): Promise<T> {
    return fetch(url, { method }).then<T>((responce) => responce.json());

  }

  load<T>(method: RequestsMethods, endpoint: EndPoints, callback: (data: T) => void, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => this.errorHandler(res))
      .then<T>((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export { Loader };
