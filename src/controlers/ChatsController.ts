import ChatsAPI from '../api/сhatsAPI';
import Router from '../tools/Router';

class ChatsController {
  private api: ChatsAPI;
  private router: Router;
  constructor() {
    this.api = new ChatsAPI;
    this.router = Router.getInstance(); 
  }
  /**
   * Получение списка чатов.
   */
  async getChats(): Promise<void> {
    try {
      const chats = await this.api.getChats();
      console.log('Получены чаты:', chats);
    } catch (error) {
      console.error('Ошибка при получении чатов:', error);
      alert('Не удалось загрузить чаты');
    }
  }
  async createChat(title: string): Promise<void> {
    try {
      const chat = await this.api.createChat({ title });
      console.log('Чат создан:', chat);
      if (chat && chat.id) {
        alert(`Чат "${chat.title}" успешно создан!`);
        // Автоматически выбрать созданный чат и перейти к нему
        await this.selectChat(chat.id);
      } else {
        alert('Чат создан, но его ID не получен.');
      }
    } catch (error) {
      console.error('Ошибка при создании чата:', error);
      alert('Не удалось создать чат');
    }
  }

  async deleteChat(chatId: number): Promise<void> {
    try {
      await this.api.deleteChat(chatId);
      console.log(`Чат с ID ${chatId} удалён`);
      alert('Чат успешно удалён');
      await this.getChats();
      const currentChatId = this.getCurrentChatId(); // Реализуйте этот метод
      if (currentChatId === chatId) {
        this.router.go('/chat'); // Перенаправление на общий чат или другую страницу
      }
    } catch (error) {
      alert('Не удалось удалить чат');
    }
  }

  async getChatUsers(chatId: number): Promise<any> {
    try {
      const users = await this.api.getChatUsers(chatId);
      console.log(`Пользователи чата ${chatId}:`, users);
      return users;
    } catch (error) {
      alert('Не удалось получить пользователей чата');
      return null;
    }
  }

  async addUserToChat(chatId: number, userIds: number[]): Promise<void> {
    try {
      await this.api.addUserToChat({ chatId, users: userIds });
      console.log(`Пользователи ${userIds} добавлены в чат ${chatId}`);
      alert('Пользователи успешно добавлены в чат');
      await this.getChatUsers(chatId);
    } catch (error) {
      console.error(`Ошибка при добавлении пользователей в чат ${chatId}:`, error);
      alert('Не удалось добавить пользователей в чат');
    }
  }

  async removeUserFromChat(chatId: number, userIds: number[]): Promise<void> {
    try {
      await this.api.removeUserFromChat({ chatId, users: userIds });
      console.log(`Пользователи ${userIds} удалены из чата ${chatId}`);
      alert('Пользователи успешно удалены из чата');
      // Обновить список пользователей чата
      await this.getChatUsers(chatId);
    } catch (error) {
      console.error(`Ошибка при удалении пользователей из чата ${chatId}:`, error);
      alert('Не удалось удалить пользователей из чата');
    }
  }

  async getChatToken(chatId: number): Promise<string | null> {
    try {
      const response = await this.api.getChatToken(chatId);
      const token = response.token;
      console.log(`Получен токен для чата ${chatId}:`, token);
      return token;
    } catch (error) {
      console.error(`Ошибка при получении токена для чата ${chatId}:`, error);
      alert('Не удалось получить токен для чата');
      return null;
    }
  }

  async selectChat(chatId: number): Promise<void> {
    try {
      const token = await this.getChatToken(chatId);
      if (!token) {
        throw new Error('Не удалось получить токен чата');
      }
      this.router.go(`/chat/${chatId}`);
    } catch (error) {
      console.error(`Ошибка при выборе чата ${chatId}:`, error);
      alert('Не удалось выбрать чат');
    }
  }
}

export default new ChatsController();
