import { EndPoints, RequestsMethods, RequestOptions, ApiResponse, ApiResponceStatus } from "../../types/types";

export class Loader {
  constructor(
    private baseLink: string,
    private options: {apiKey: string}
    ) {}

   getResp<T>(
    { endpoint, options = {} }: {endpoint: EndPoints, options?: RequestOptions},
    callback: (data: T) => void,
  ) {
    this.load<T>(RequestsMethods.GET, endpoint, callback, options)
    .catch(() => {});
  }

  makeUrl(options: RequestOptions, endpoint: EndPoints) {
    const urlOptions: Record<string, string> = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  async load<T>(method: RequestsMethods, endpoint: EndPoints, callback: (data: T) => void, options = {}): Promise<void> {
    try {
      const res = await fetch(this.makeUrl(options, endpoint), { method });
      if (!res.ok || res.status !== 200) {
        throw Error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      const data =  await res.json() as ApiResponse;
      if (data.status === ApiResponceStatus.ERROR) {
        throw Error(data.message);
      }
      callback(data as T);

    } catch (err) {
      console.log(err);
    }
  }
}
