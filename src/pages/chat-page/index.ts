import Block from "../../tools/Block";
import ChatItem from "../../components/chat-item";
import Link from "../../components/link";
import "./chat-page.scss";
import ChatsAPI from "../../api/сhatsAPI"
import { Button } from "../../components";
import сhatsAPI from "../../api/сhatsAPI";
interface ChatPageProps {
  currentChatName?: string;
  chats?: Array<ChatItem>;
}
interface ChatPageState {
  currentChatId: number | null;
}

export default class ChatPage extends Block {
  private state: ChatPageState;

  constructor(props: ChatPageProps = {}) {
    super({
      ...props,
      profileLink: new Link({
        text: 'Профиль',
        href: '/profile',
        className: 'chat-page__profile-link',
      }),
      createChatButton: new Button({
        text: 'Создать новый чат',
        className: 'button create-chat-button',
        events: {
          click: (event: Event) => this.handleCreateChatClick(event),
        },
      }),
      deleteChatButton: new Button({
        text: 'Удалить чат',
        className: 'button delete-chat-button',
        events: {
          click: (event: Event) => this.handleDeleteChatClick(event),
        },
      }),
      addUserButton: new Button({
        text: 'Добавить пользователя',
        className: 'button add-user-button',
        events: {
          click: (event: Event) => this.handleAddUserClick(event),
        },
      }),
      removeUserButton: new Button({
        text: 'Удалить пользователя',
        className: 'button remove-user-button',
        events: {
          click: (event: Event) => this.handleRemoveUserClick(event),
        },
      }),
      chats: '',
    });

    this.state = {
      currentChatId: null,
    };

    this.initChats();
  }

  async initChats() {
    try {
      const chats = await ChatsAPI.getChats();
      console.log("🚀 ~ ChatPage ~ initChats ~ chats:", chats)
      if (chats.length > 0) {
        const chatItems = chats.map(chat => {
          const chatItem = new ChatItem({
            id: chat.id,
            name: chat.title,
            message: chat.lastMessage || 'Последнее сообщение',
            avatar: chat.avatar,
            unread: chat.unreadMessages,
            current: false,
            events: {
              click: () => this.handleChatClick(chat.id),
            },
          }).render();
          return chatItem;
        });

        this.setProps({ chats: chatItems.join('') });
      } else {
        this.setProps({ chats: '<p>Нет доступных чатов</p>' });
      }
    } catch (error) {
      console.error('Ошибка при получении чатов:', error);
      this.setProps({ chats: '<p>Ошибка при загрузке чатов</p>' });
    }
  }

  getCurrentChatId(): number | null {
    return this.state.currentChatId;
  }

  handleChatClick(chatId: number) {
    console.log(`Чат с ID ${chatId} был выбран`);
    this.state.currentChatId = chatId;
    this.setProps({ currentChatName: `Чат ${chatId}` });
    console.log(`Текущий выбранный чат: ${this.state.currentChatId}`);
  }

  handleCreateChatClick(event: Event) {
    event.preventDefault();

    const title = prompt('Введите название нового чата');

    if (title) {
      ChatsAPI.createChat({ title })
        .then((chat) => {
          if (chat && chat.id) {
            const chatTitle = chat.title ? chat.title : 'Без названия';
            alert(`Чат "${chatTitle}" успешно создан с ID ${chat.id}!`);
            this.initChats(); // Обновляем список чатов после создания нового
          } else {
            alert('Чат создан, но его ID не получен.');
          }
        })
        .catch(error => {
          console.error('Ошибка при создании чата:', error);
        });
    } else {
      alert('Название чата не может быть пустым');
    }
  }

  handleDeleteChatClick(event: Event) {
    event.preventDefault();
    const chatId = prompt('Введите ID чата для удаления');
  
    if (chatId) {
      const numericChatId = parseInt(chatId, 10);
      if (!isNaN(numericChatId)) {
        ChatsAPI.deleteChat(numericChatId)
          .then(() => {
            alert(`Чат с ID ${numericChatId} успешно удален!`);
            this.state.currentChatId = null;
            this.initChats();
          })
          .catch(error => {
            console.error('Ошибка при удалении чата:', error);
          });
      } else {
        alert('Неверный формат ID чата.');
      }
    } else {
      alert('ID чата не был введен.');
    }
  }

  handleAddUserClick(event: Event) {
    event.preventDefault();

    const chatIdInput = prompt('Введите номер чата для добавления пользователя');
    const chatId = parseInt(chatIdInput || '', 10);

    if (!chatId || isNaN(chatId)) {
      alert('Некорректный номер чата');
      return;
    }

    const userIdInput = prompt('Введите ID пользователя для добавления');
    const userId = parseInt(userIdInput || '', 10);

    if (!userId || isNaN(userId)) {
      alert('Некорректный ID пользователя');
      return;
    }

    ChatsAPI.addUserToChat({ users: [userId], chatId })
      .then(response => {
        alert(`Пользователь с ID ${userId} успешно добавлен в чат с ID ${chatId}`);
        console.log('Ответ сервера:', response);
      })
      .catch(error => {
        console.error('Ошибка при добавлении пользователя:', error);
      });
  }

  handleRemoveUserClick(event: Event) {
    event.preventDefault();

    const chatIdInput = prompt('Введите номер чата для удаления пользователя');
    const chatId = parseInt(chatIdInput || '', 10);

    if (!chatId || isNaN(chatId)) {
      alert('Некорректный номер чата');
      return;
    }

    const userIdInput = prompt('Введите ID пользователя для удаления');
    const userId = parseInt(userIdInput || '', 10);

    if (!userId || isNaN(userId)) {
      alert('Некорректный ID пользователя');
      return;
    }

    ChatsAPI.removeUserFromChat({ users: [userId], chatId })
      .then(() => {
        alert(`Пользователь с ID ${userId} успешно удалён из чата с ID ${chatId}`);
      })
      .catch(error => {
        console.error('Ошибка при удалении пользователя:', error);
      });
  }


  render(): string {
    return `
      <div class="chat-page">
        <div class="chat-page__sidebar">
          <div class="chat-page__sidebar-header">
            {{{profileLink}}}
            {{{createChatButton}}}
            {{{deleteChatButton}}}
            {{{addUserButton}}}
            {{{removeUserButton}}}
            <input type="text" placeholder="Поиск" class="chat-page__search-input"/>
          </div>
          <div class="chat-page__chats">
            {{{chats}}} <!-- Вставка HTML строк чатов -->
          </div>
        </div>
        <div class="chat-page__main">
          <div class="chat-page__header">
            <h2>{{currentChatName}}</h2>
          </div>
          <div class="chat-page__messages" id="messages">
          </div>
          <div class="chat-page__footer">
            <input type="text" id="message" placeholder="Введите сообщение..." />
            {{{sendMessage}}}
          </div>
        </div>
      </div>
    `;
  }
}
