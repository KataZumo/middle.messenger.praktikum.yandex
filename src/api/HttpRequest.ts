type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface CustomHeaders {
  [key: string]: string;
}

interface Params {
  [key: string]: string | number | boolean;
}

interface IRequestOptions {
  data?: unknown;
  headers?: CustomHeaders;
  withCredentials?: boolean;
  responseType?: XMLHttpRequestResponseType;
  method?: HttpMethod;
  timeout?: number;
}

export class HttpRequest {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  static createQueryString(params: Params): string {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
      )
      .join("&");
  }

  private request<T>(
    method: HttpMethod,
    url: string,
    options: IRequestOptions = {},
  ): Promise<T> {
    const {
      data,
      headers = {},
      withCredentials = true,
      responseType = 'json',
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const fullURL = `${this.baseURL}${url}`;

      if (method === 'GET' && data) {
        const queryString = HttpRequest.createQueryString(data as Params);
        url += `?${queryString}`;
      }

      xhr.open(method, fullURL);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          if (responseType === 'json') {
            resolve(xhr.response); 
          } else {
            resolve(xhr.responseText as any); 
          }
        } else {
          reject(
            new Error(
              `Request failed with status ${xhr.status}: ${xhr.statusText}`,
            ),
          );
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.timeout = timeout;
      xhr.responseType = responseType;
      xhr.withCredentials = withCredentials;

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }

  get<T>(
    url: string,
    params: Params = {},
    headers: CustomHeaders = {},
    options: IRequestOptions = {},
  ): Promise<T> {
    const queryString = HttpRequest.createQueryString(params);
    const fullURL = queryString ? `${url}?${queryString}` : url;
    return this.request<T>("GET", fullURL, { ...options, headers });
  }

  post<T>(
    url: string,
    body: unknown,
    headers: CustomHeaders = {},
    options: IRequestOptions = {},
  ): Promise<T> {
    return this.request<T>("POST", url, { ...options, headers, data: body });
  }

  put<T>(
    url: string,
    body: unknown,
    headers: CustomHeaders = {},
    options: IRequestOptions = {},
  ): Promise<T> {
    return this.request<T>("PUT", url, { ...options, headers, data: body });
  }

  delete<T>(
    url: string,
    body: unknown = null,
    headers: CustomHeaders = {},
    options: IRequestOptions = {},
  ): Promise<T> {
    return this.request<T>("DELETE", url, { ...options, headers, data: body });
  }
}
