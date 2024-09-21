import AuthAPI from "../api/authAPI";
import { SigninData, SignUpRequest, UserData } from "../api/type";
import Router from "../tools/Router";

class AuthController {
    private api: AuthAPI;
  
    constructor() {
      this.api = new AuthAPI();
    }
  
    async login(data: SigninData): Promise<void> {
        try {
          const user = await this.api.login(data);
          if (user && user.id) {
            await this.fetchUserData();
            const router = Router.getInstance();
            router.go('/messenger');
          } else {
            await this.fetchUserData(); 
            const router = Router.getInstance();
            router.go('/messenger'); 
          }
        } catch (error) {
          console.error('ошибка login', error);
        }
      }
  
    async register(data: SignUpRequest): Promise<void> {
        try {
          const user = await this.api.signup(data);
          if (user && user.id) { 
            await this.fetchUserData();
            const router = Router.getInstance();
            router.go('/messenger');
          } else {
            throw new Error('нет данных пользователя');
          }
        } catch (error) {
          console.error('ошибка register', error);
          throw error;
        }
      }
  
      async getUser(): Promise<any | null> {
        try {
          const user = await this.api.getUser();
          if (user) {
            this.saveUserData(user); 
            return user;
          } else {
            return null;
          }
        } catch (error) {
          this.clearUserData(); 
          return null;
        }
      }

      private async fetchUserData(): Promise<void> {
        try {
          const user = await this.getUser();
          if (user) {
            console.log('Fetched full user data after registration/login:', user);
          }
        } catch (error) {
          console.error('Проблема с запросом данных при регистрации или авторизации', error);
        }
      }
  
    async logout(): Promise<void> {
      try {
        await this.api.logout();
        this.clearUserData();
      } catch (error) {
        console.error('Ошибка с выходом', error);
      }
    }
  
    private saveUserData(user: any) {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('user', JSON.stringify(user));
        } else {
          console.warn('Attempted to save null user data to localStorage');
        }
      }

    private clearUserData() {    
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    }
  
    getStoredUserData(): UserData | null {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
  }
  
  export default new AuthController();
