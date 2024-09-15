import { BaseAPIData } from './api';
import { SigninData, SignUpRequest } from './type';


  
  class AuthAPI extends BaseAPIData {
    constructor() {
      super('auth')
    }
  
    async login(data: SigninData): Promise<any>  {
      return await this.http.post('/signin', data )
    }
  
    async signup(data: SignUpRequest): Promise<any>  {
     return  await this.http.post('/signup', data )

    }
  
    async getUser(): Promise<any> {
      return await this.http.get('/user');
    }
  
    async logout(): Promise<any>  {
      return await this.http.post('/logout')
    }
  }
  
  export default AuthAPI
  