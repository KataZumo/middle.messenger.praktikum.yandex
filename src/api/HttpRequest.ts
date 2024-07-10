type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface CustomHeaders {
  [key: string]: string;
}

interface Params {
  [key: string]: string | number | boolean;
}
class HttpRequest {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  static createQueryString(params: Params): string {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");
  }

  private request<T>(
    method: HttpMethod,
    url: string,
    body: unknown = null,
    headers: CustomHeaders = {},
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${this.baseURL}${url}`);
      xhr.setRequestHeader("Content-Type", "application/json");

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value as string);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(
            new Error(
              `Request failed with status ${xhr.status}: ${xhr.statusText}`,
            ),
          );
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));

      if (body) {
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send();
      }
    });
  }

  get<T>(
    url: string,
    params: Params = {},
    headers: CustomHeaders = {},
  ): Promise<T> {
    const queryString = HttpRequest.createQueryString(params);
    const fullURL = queryString ? `${url}?${queryString}` : url;
    return this.request<T>("GET", fullURL, null, headers);
  }

  post<T>(url: string, body: unknown, headers: CustomHeaders = {}): Promise<T> {
    return this.request<T>("POST", url, body, headers);
  }

  put<T>(url: string, body: unknown, headers: CustomHeaders = {}): Promise<T> {
    return this.request<T>("PUT", url, body, headers);
  }

  delete<T>(
    url: string,
    body: unknown = null,
    headers: CustomHeaders = {},
  ): Promise<T> {
    return this.request<T>("DELETE", url, body, headers);
  }
}
