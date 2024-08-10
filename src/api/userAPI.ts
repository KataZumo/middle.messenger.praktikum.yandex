import { BaseAPIData } from './api';
import { BaseAPI } from './BaseAPI';
import { HttpRequest } from './HttpRequest';

type SignupData = {
    email: string;
    password: string;
    name: string;
  };
  
  type SigninData = {
    login: string;
    password: string;
  };

type SignUpRequest ={
    first_name: string
    second_name: string
    login: string
    email: string
    phone: string
    password: string
  }
  
  type UserData = {
    id: string;
    login: string;
    name: string;
    password: string;
  };
  
  class AuthAPI extends BaseAPIData {
    constructor() {
      super('auth')
    }
  
    login(data: SigninData) {
      return this.http.post('/signin', data )
    }
  
    signup(data: SignUpRequest) {
      return this.http.post('/signup', data )
    }
  
    getUser() {
      return this.http.get('/user')
    }
  
    logout() {
      return this.http.post('/logout')
    }
  }
  
  export default AuthAPI;
  