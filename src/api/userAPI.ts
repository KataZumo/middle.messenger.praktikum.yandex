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

export type UpdateProfileData = Omit<User, 'id' | 'avatar'>

class UserAPI extends BaseAPIData {
  constructor() {
    super('user')
  }

  updateProfile(data: UpdateProfileData) {
    return this.http.put('/profile', data )
  }

    changePassword(data: ChangePasswordData) {
    return this.http.post('/password', data )
  }

}

export default new UserAPI



  // changePassword(data: ChangePasswordData) {
  //   return this.http.post('/password', { data })
  // }

  // changeAvatar(file: File) {
  //   const formData = new FormData()
  //   formData.append('avatar', file)
  //   return this.http.put('/profile/avatar', {
  //     data: formData,
  //   })
  // }

    // searchUser(login: string) {
  //   return this.http.post('/search', { data: { login } })
  // }
