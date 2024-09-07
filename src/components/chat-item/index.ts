import Block from "../../tools/Block";
import "./chat-item.scss";

interface ChatItemProps {
  avatar?: string;
  message: string;
  current?: boolean;
  name?: string;
  unread?: number;
  id?: number;
}

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
    });
  }

  render() {
    const { name, avatar, message, unread, current } = this.props;

    return `
      <div class="chat-item ${current ? 'chat-item--current' : ''}">
        <div class="chat-item__avatar">
          <img src="${avatar}" alt="Avatar" class="chat-item__avatar-image">
        </div>
        <div class="chat-item__details">
          <div class="chat-item__name">${name}</div>
          <div class="chat-item__message">${message}</div>
        </div>
        // <div class="chat-item__unread">${unread ?? ''}</div>
        </div>
        `;
      }
    }
    // <button class="chat-item__delete-button" data-chat-id="${this.props.id}">Удалить</button>
