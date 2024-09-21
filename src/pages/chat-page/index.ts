import Block from "../../tools/Block";
import ChatItem from "../../components/chat-item";
import Link from "../../components/link";
import "./chat-page.scss";
import ChatsAPI from "../../api/сhatsAPI"
import { Button } from "../../components";
import ChatWebSocket from "../../tools/ChatWebSocket";
import { getUserData } from "../../utils/HOC";
interface ChatPageProps {
  currentChatName?: string;
  chats?: Array<ChatItem>;
}
interface ChatPageState {
  currentChatId: number | null;
}
export default class ChatPage extends Block {
  private state: ChatPageState;
  private webSocket: ChatWebSocket | null = null;

  constructor(props: ChatPageProps = {}) {
    console.log('ChatPage Props:', props);

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
      selectChatButton: new Button({
        text: 'Выбрать чат',
        className: 'button select-chat-button',
        events: {
          click: (event: Event) => this.handleSelectChatClick(event),
        },
      }),
      sendMessage: new Button({
        text: 'Отправить',
        className: 'button send-message-button',
        events: {
          click: (event: Event) => this.handleSendMessageClick(event),
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
        const chatItems = chats.map((chat: any) => {
          const chatItem = new ChatItem({
            id: chat.id,
            name: chat.title,
            message: chat.last_message.content || 'Последнее сообщение',
            avatar: chat.avatar,
            unread: chat.unreadMessages,
            current: false,
          }).render();
          return chatItem;
        });

        this.setProps({ chats: chatItems.join('') });
      } else {
        this.setProps({ chats: '<p>Нет доступных чатов</p>' });
      }
    } catch (error) {
      this.setProps({ chats: '<p>Ошибка при загрузке чатов</p>' });
    }
  }

  getCurrentChatId(): number | null {
    return this.state.currentChatId;
  }

  async handleSelectChatClick(event: Event) {
    event.preventDefault();
    const chatIdInput = prompt('Введите ID чата для подключения');
    const chatId = parseInt(chatIdInput || '', 10);
    const data = getUserData()?.id as number


    if (isNaN(chatId) || chatId <= 0) {
        alert('Некорректный ID чата');
        console.error('Некорректный ID чата:', chatIdInput);
        return;
    }
    console.log('Выбранный chatId:', chatId);
    console.log('Текущий userId:', data);

    try {
        const response = await ChatsAPI.getChatToken(chatId);
        const token = response.token;
        if (!token) {
            throw new Error('Токен чата не получен');
        }

        console.log('Токен чата:', token);


        if (this.webSocket) {
            this.webSocket.close();
        }

        this.webSocket = new ChatWebSocket(data, chatId, token);

        this.webSocket.on('message', (data: any) => {
            console.log('Новое сообщение:', data);
            this.addMessageToUI(data);
        });


        this.webSocket.on('notification', (data: any) => {
            console.log("🚀 ~ ChatPage ~ this.webSocket.on ~ data:", data)
            console.log('Уведомление:', data);
        });


        this.state.currentChatId = chatId;
        this.setProps({ currentChatName: `Чат ${chatId}` });
    } catch (error: any) {
        console.error('Ошибка при получении токена чата:', error);
        alert('Не удалось подключиться к чату');
    }
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
            this.initChats();
          } else {
            alert('Чат создан, но его ID не получен.');
          }
        })
          //@ts-expect-error null
        .catch(error => {
          alert('Не удалось создать чат');
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
            this.setProps({ currentChatName: '' });
            this.initChats();

            if (this.webSocket) {
              this.webSocket.close();
              this.webSocket = null;
            }
          })
          //@ts-expect-error null
          .catch(error => {
            alert('Не удалось удалить чат');
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
    if (isNaN(chatId) || chatId <= 0) {
      alert('Некорректный номер чата');
      return;
    }
    const userIdInput = prompt('Введите ID пользователя для добавления');
    const userId = parseInt(userIdInput || '', 10);
    if (isNaN(userId) || userId <= 0) {
      alert('Некорректный ID пользователя');
      return;
    }
    ChatsAPI.addUserToChat({ 
      chatId,
      users: [userId], 
    })
      //@ts-expect-error null
    .then(response => {
      alert(`Пользователь с ID ${userId} успешно добавлен в чат с ID ${chatId}`);
 
    })
    .catch(error => {
  
      alert(`Не удалось добавить пользователя: ${error.message}`);
    });
  }
  
  handleRemoveUserClick(event: Event) {
    event.preventDefault();
    const chatIdInput = prompt('Введите номер чата для удаления пользователя');
    const chatId = parseInt(chatIdInput || '', 10);
    if (isNaN(chatId) || chatId <= 0) {
      alert('Некорректный номер чата');
      return;
    }
    const userIdInput = prompt('Введите ID пользователя для удаления');
    const userId = parseInt(userIdInput || '', 10);
    if (isNaN(userId) || userId <= 0) {
      alert('Некорректный ID пользователя');
      return;
    }
    ChatsAPI.removeUserFromChat({ users: [userId], chatId })
      .then(() => {
        alert(`Пользователь с ID ${userId} успешно удалён из чата с ID ${chatId}`);
      })
      //@ts-expect-error null
      .catch(error => {

        alert('Не удалось удалить пользователя');
      });
  }

  handleSendMessageClick(event: Event) {
    event.preventDefault();
    const messageInput = document.getElementById('message') as HTMLInputElement;
    const message = messageInput?.value.trim();
    if (!message) {
      alert('Сообщение не может быть пустым');
      return;
    }
    if (this.webSocket) {
      this.webSocket.sendMessage(message);
      this.addMessageToUI({
        userId: this.props.userId,
        content: message,
      });
      messageInput.value = '';
    } else {
      alert('Не подключено к чату');
    }
  }

  addMessageToUI(data: any) {
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
      const messageElement = document.createElement('div');
      messageElement.className = 'message';
      messageElement.textContent = `${data.userId}: ${data.content}`;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight; 
    }
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
            {{{selectChatButton}}}
            <input type="text" placeholder="Поиск" class="chat-page__search-input"/>
          </div>
          <div class="chat-page__chats">
            {{{chats}}}
          </div>
        </div>
        <div class="chat-page__main">
          <div class="chat-page__header">
            <h2>{{currentChatName}}</h2>
            <h3>{{chatId}}</h3>
          </div>
          <div class="chat-page__messages" id="messages">
            <!-- Здесь будут отображаться сообщения -->
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

