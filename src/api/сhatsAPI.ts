import { BaseAPIData } from "./api";
  
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
      return await this.http.delete('/', {
         chatId ,
      });
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

    async getChatToken(chatId: number): Promise<any> {
      return await this.http.post(`/token/${chatId}`, {
        body: JSON.stringify({ chatId }),
      });
  }
}
  
export default new ChatsAPI;
