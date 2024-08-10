import { HttpRequest } from "../../api/HttpRequest";

export default class LoginAPI {
    httpTransport: HttpRequest = new HttpRequest();

    signInRequest = (body: {
        'login': 'string',
        'password': 'string'
      }) => this.httpTransport.post('/auth/signin', body);

    getAuthUser = () => this.httpTransport.get('/auth/user');
}
