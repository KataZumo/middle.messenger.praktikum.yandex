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
   changeAvatar(formData: FormData): Promise<any> {
    return this.http.put('/user/profile/avatar', formData);
  }
}

export default new UserAPI
