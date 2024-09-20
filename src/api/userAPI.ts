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

export class UserAPI extends BaseAPIData {

  constructor() {
    super('user')
  }

  async updateProfile(data: User) {
    return await this.http.put('/profile', data )
  }

   async changePassword(data: ChangePasswordData) {
    return await this.http.put('/password', data )
  }
 async changeAvatar(formData: FormData): Promise<any> {
    return await this.http.put('/profile/avatar', formData);
  }
}

// export default UserAPI
