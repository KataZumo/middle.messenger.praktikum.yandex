import { HttpRequest } from "./HttpRequest";

export const host = 'https://ya-praktikum.tech/api/v2';


export class BaseAPIData {
  protected http: HttpRequest

  constructor(endpoint: string) {
    this.http = new HttpRequest(`${host}/${endpoint}`)
  }
}
