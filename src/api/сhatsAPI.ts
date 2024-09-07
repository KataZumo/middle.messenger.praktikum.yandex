import { BaseAPIData } from "./api";
import { UserData } from "./type";

// Определение типов данных для методов
interface Chat {
    id: number;
    title: string;
    avatar?: string;
    unreadMessages: any;
    lastMessage: any
  }
  
  interface CreateChatData {
    title: string;
  }
  
  interface AddRemoveUsersData {
    users: number[];
    chatId: number;
  }
  
  interface NewMessagesCount {
    count: number;
  }
  
//   class ChatsAPI extends BaseAPIData {
//     constructor() {
//       super('chats');
//     }
  
//     async getChats(params: { offset?: number; limit?: number; title?: string } = { offset: 0, limit: 15, title: "" }): Promise<Chat[]> {
//       return await this.http.get<Chat[]>('/', { data: JSON.stringify(params) });
//     }
  
//     async createChat(data: CreateChatData): Promise<Chat> {
//       return await this.http.post<Chat>('/', data);
//     }
  
//     async getChatToken(chatId: number): Promise<string> {
//       const response = await this.http.post<{ token: string }>(`/token/${chatId}`);
//       return response.token;
//     }
  
//     async findUser(formData: any): Promise<UserData[]> {
//       return await this.http.post<UserData[]>(`/user/search`, JSON.stringify(formData));
//     }
  
//     async addUsersToChat(data: AddRemoveUsersData): Promise<void> {
//       return await this.http.put<void>('/users', data);
//     }
  
//     async getChatUsers(chatId: number, params: { offset?: number; limit?: number; name?: string; email?: string } = { offset: 0, limit: 15, name: "", email: "" }): Promise<UserData[]> {
//       return await this.http.get<UserData[]>(`/${chatId}/users`, { data: JSON.stringify(params) });
//     }
  
//     async removeUsersFromChat(data: AddRemoveUsersData): Promise<void> {
//       return await this.http.delete<void>('/users', { data: JSON.stringify(data) });
//     }
  
//     async deleteChat(chatId: number): Promise<void> {
//       return await this.http.delete<void>(`/${chatId}`);
//     }
  
//     async deleteChatWithData(data: { chatId: number }): Promise<void> {
//         return await this.http.delete<void>('/', {
//             data
//         });
//     }
  
//     async sendMessage(chatId: number, message: string): Promise<void> {
//       return await this.http.post<void>(`/messages`, JSON.stringify({ chatId, message }));
//     }
//   }


class ChatsAPI extends BaseAPIData {
    constructor() {
      super('chats');
    }
  
    async getChats(): Promise<any> {
      return await this.http.get('/');
    }
  
    async createChat(data: { title: string }): Promise<any> {
      return await this.http.post('/', data);
    }
  
    async deleteChat(chatId: number): Promise<any> {
      return await this.http.delete(`/${chatId}`);
    }
  
    async getChatUsers(chatId: number): Promise<any> {
      return await this.http.get(`/${chatId}/users`);
    }
  
    async getNewMessagesCount(chatId: number): Promise<any> {
      return await this.http.get(`/new/${chatId}`);
    }
  
    async uploadChatAvatar(data: FormData): Promise<any> {
      return await this.http.put('/avatar', data);
    }
  
    async addUserToChat(data: { users: number[], chatId: number }): Promise<any> {
      return await this.http.put('/users', data);
    }
  
    async removeUserFromChat(data: { users: number[], chatId: number }): Promise<any> {
      return await this.http.delete('/users', data);
    }
  }
  
  export default new ChatsAPI();
  
  