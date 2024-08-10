import { Router } from "express";
import { host } from "../../api/api";
import AuthAPI from "../../api/userAPI";
import Route from "../../tools/Route";
import { HttpRequest } from "../../api/HttpRequest";
import LoginAPI from "./login-page.api";

// interface LoginFormModel {
//     login: string;
//     password: string;
//   }
  
  const authAPI = new LoginAPI(); // Укажите правильный baseURL
  
//   class UserLoginController {
//     public async login(data: LoginFormModel) {
//       try {
//         // Запускаем крутилку
//         this.showLoader();
  
//         // Валидация данных
//         const validateData = this.validateLoginData(data);
//         if (!validateData.isCorrect) {
//           throw new Error(validateData.message);
//         }
  
//         // Выполнение запроса на авторизацию
//         const user = await authAPI.signin(data);
  
//         // Сохранение данных пользователя
//         localStorage.setItem('user', JSON.stringify(user));
  
//         // Перенаправление на другую страницу
//         Router.go('/chats');
  
//         // Останавливаем крутилку
//         this.hideLoader();
//       } catch (error) {
//         // Логика обработки ошибок
//         console.error('Signin error:', error);
//         this.hideLoader();
//         alert('Ошибка авторизации: ' + error.message);
//       }
//     }
  
//     private validateLoginData(data: LoginFormModel): { isCorrect: boolean; message: string } {
//       if (!data.login || !data.password) {
//         return { isCorrect: false, message: 'Login and password are required' };
//       }
//       return { isCorrect: true, message: '' };
//     }
  
//     private showLoader() {
//       // Логика для отображения крутилки
//       console.log('Show loader');
//     }
  
//     private hideLoader() {
//       // Логика для скрытия крутилки
//       console.log('Hide loader');
//     }
//   }
  
//   export default UserLoginController;




