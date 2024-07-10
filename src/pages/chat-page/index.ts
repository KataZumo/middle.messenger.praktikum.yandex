import Block from "../../tools/Block";
import ChatItem from "../../components/chat-item";
import Link from "../../components/link";
import "./chat-page.scss";

interface ChatPageProps {
  currentChatName?: string;
  chats?: Array<{
    name: string;
    message: string;
    unread?: number;
    avatar?: string;
  }>;
}

export default class ChatPage extends Block {
  constructor(props: ChatPageProps) {
    super({
      ...props,
      profileLink: new Link({
        text: "Профиль",
        href: "/profile",
        className: "chat-page__profile-link",
      }),

      chat: new ChatItem({
        name: "Вейдер",
        message: "Скоро прикоюху сделаю",
        avatar:
          "https://t4.ftcdn.net/jpg/03/13/36/79/360_F_313367965_7B8Y7JrJ3JAG6zdjw51L59kVQZMlA9K7.jpg",
      }),
      chat1: new ChatItem({
        name: "Люк",
        message: "я твой отец",
      }),
      chat2: new ChatItem({
        name: "Брат",
        message: "го тусить",
        avatar:
          "https://thediffpodcast.com/assets/images/jordan-2c43ff762e625d49ea58424e3e74188a.jpg",
      }),
      chat3: new ChatItem({
        name: "Икогнито",
        message: "кредит не нужен?",
      }),
      chat4: new ChatItem({
        name: "Хомяк",
        message: "потыкай еще",
      }),
      chat5: new ChatItem({
        name: "Хомяк",
        message: "потыкай еще",
      }),
    });
  }

  render() {
    return `
      <div class="chat-page">
        <div class="chat-page__sidebar">
          <div class="chat-page__sidebar-header">
            {{{profileLink}}}
            <input type="text" placeholder="Поиск" class="chat-page__search-input"/>
          </div>
          <div class="chat-page__chats">
            {{{chat}}}
            {{{chat1}}}
            {{{chat2}}}
            {{{chat3}}}
            {{{chat4}}}
            {{{chat5}}}
          </div>
        </div>
        <div class="chat-page__main">
          <div class="chat-page__header">
            <h2>Чат с {{currentChatName}}</h2>
          </div>
          <div class="chat-page__messages" id="messages">
          </div>
          <div class="chat-page__footer">
            <input type="text" id="message" placeholder="Введите сообщение..." />
            <button id="send-button">Отправить</button>
          </div>
        </div>
      </div>
    `;
  }
}
