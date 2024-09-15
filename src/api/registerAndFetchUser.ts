import { store } from "../tools/Store";
import AuthAPI from "./authAPI";

export async function registerAndFetchUser(data: any) {
    try {
      await AuthAPI.signup(data);
  
      const userData = await AuthAPI.getUser();
      
      store.setState({
        profile: {
          name: userData.first_name,
          email: userData.email,
          loginName: userData.login,
          firstName: userData.first_name,
          secondName: userData.second_name,
          chatName: userData.display_name,
          phone: userData.phone,
          photoUrl: userData.avatar,
        },
      });
  
      window.location.href = '/profile';
    } catch (error) {
      console.error('Ошибка при регистрации или получении данных пользователя:', error);
    }
  }
