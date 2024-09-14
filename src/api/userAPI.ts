import { BaseAPIData } from "./api";

export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
  email: string
}

// export type UpdateProfileData = Omit<User, 'id' | 'avatar'>

class UserAPI extends BaseAPIData {
  constructor() {
    super('user')
  }

  updateProfile(data: User) {
    return this.http.put('/profile', data )
  }

    changePassword(data: ChangePasswordData) {
    return this.http.put('/password', data )
  }

  //   changeAvatar(file: File) {
  //   const formData = new FormData()
  //   formData.append('avatar', file)
  //   console.log('Отправка FormData на сервер:', formData); // Лог перед отправкой
  //   return this.http.put('/user/profile/avatar', formData);
  // }
  changeAvatar(formData: FormData) {
    const options = {
      credentials: 'include',
      mode: 'cors',
    };
  
    // Используем правильный базовый URL
    const changeAvatarUrl = 'https://ya-praktikum.tech/api/v2/user/profile/avatar';
  
    return fetch(changeAvatarUrl, {
      method: 'PUT',
      body: formData,
      ...options,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`);
        }
        return response.json(); // Парсим JSON-ответ от сервера
      })
      .then(data => {
        console.log('Ответ от сервера при изменении аватарки:', data); // Лог ответа от сервера
        return data; // Возвращаем данные пользователя с новым аватаром
      })
      .catch(error => {
        console.error('Ошибка при отправке запроса:', error);
        throw error;
      });
  }
  
  
  
  

}

export default new UserAPI


