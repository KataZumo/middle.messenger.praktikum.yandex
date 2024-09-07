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
    this.state.currentChatId = chatId;
    this.setProps({ currentChatName: `Чат ${chatId}` }); // Обновите заголовок чата, если нужно
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

    const chatId = this.getCurrentChatId();
    if (chatId) {
      ChatsAPI.deleteChat(chatId)
        .then(() => {
          alert(`Чат с ID ${chatId} успешно удален!`);
          this.state.currentChatId = null; // Сброс текущего чата после удаления
          this.initChats(); // Обновляем список чатов после удаления
        })
        .catch(error => {
          console.error('Ошибка при удалении чата:', error);
        });
    } else {
      alert('Не выбран чат для удаления');
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




// async handleDeleteChatClick(event: Event) {
//   event.preventDefault();

//   const chatIdString = prompt('Введите ID чата, который хотите удалить');
//   const chatId = chatIdString ? parseInt(chatIdString, 10) : null;

//   if (chatId !== null && !isNaN(chatId)) {
//       const confirmation = confirm(`Вы уверены, что хотите удалить чат с ID ${chatId}?`);

//       if (confirmation) {
//           try {
//               await ChatsAPI.deleteChatWithData({ chatId });
//               alert(`Чат с ID ${chatId} успешно удален!`);
//               this.initChats(); // Обновляем список чатов после удаления
//           } catch (error) {
//               console.error('Ошибка при удалении чата:', error);
//               alert('Произошла ошибка при удалении чата. Попробуйте снова.');
//           }
//       }
//   } else {
//       alert('Некорректный ID чата. Попробуйте снова.');
//   }
// }

// async handleAddUserToChatClick(event: Event) {
//   event.preventDefault();

//   const userIdString = prompt('Введите ID пользователя, которого хотите добавить');
//   const chatIdString = prompt('Введите ID чата, в который хотите добавить пользователя');
//   const userId = userIdString ? parseInt(userIdString, 10) : null;
//   const chatId = chatIdString ? parseInt(chatIdString, 10) : null;

//   if (userId !== null && !isNaN(userId) && chatId !== null && !isNaN(chatId)) {
//     try {
//       await ChatsAPI.addUsersToChat({ users: [userId], chatId });
//       alert(`Пользователь с ID ${userId} успешно добавлен в чат с ID ${chatId}!`);
//       this.initChats(); // Если необходимо, обновляем список чатов
//     } catch (error) {
//       console.error('Ошибка при добавлении пользователя в чат:', error);
//       alert('Произошла ошибка при добавлении пользователя в чат. Попробуйте снова.');
//     }
//   } else {
//     alert('Некорректные ID пользователя или чата. Попробуйте снова.');
//   }
// }


// deleteChatButton: new Button({
//   text: 'Удалить чат',
//   className: 'button create-chat-button',
//   events: {
//     click: (event: Event) => this.handleDeleteChatClick(event),
//   },
// }),
// addUserButton: new Button({
//   text: 'Добавить пользователя',
//   className: 'button add-user-button',
//   events: {
//     click: (event: Event) => this.handleAddUserToChatClick(event),
//   },
// }),
