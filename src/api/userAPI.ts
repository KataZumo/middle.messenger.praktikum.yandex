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
  changeAvatar(formData: FormData) {
    const options = {
      credentials: 'include',
      mode: 'cors',
    };
  
    const changeAvatarUrl = 'https://ya-praktikum.tech/api/v2/user/profile/avatar';
  
    return fetch(changeAvatarUrl, {
      // method: 'PUT',
      // body: formData,
      // ...options,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`);
        }
        return response.json(); 
      })
      .then(data => {
       
        return data; 
      })
      .catch(error => {
        
        throw error;
      });
  }
}

export default new UserAPI
