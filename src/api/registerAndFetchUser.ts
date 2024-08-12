import { store } from "../tools/Store";
import AuthAPI from "./authAPI";

export async function registerAndFetchUser(data: any) {
    try {
      // Регистрация пользователя
      await AuthAPI.signup(data);
  
      // Получение данных пользователя после регистрации
      const userData = await AuthAPI.getUser();
  
      // Обновление стора данными пользователя
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
  
      // Перенаправление на страницу профиля
      window.location.href = '/profile';
    } catch (error) {
      console.error('Ошибка при регистрации или получении данных пользователя:', error);
    }
  }
