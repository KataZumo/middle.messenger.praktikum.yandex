import Block from "../../tools/Block";
import "./chat-item.scss";

interface ChatItemProps {
  avatar?: string;
  message: string;
  current?: boolean;
  name?: string;
  unread?: number;
  id?: number;
  selected?: boolean; 
  onSelect?: (id: number) => void;
}

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: () => this.handleClick(),
      },
    });
  }

  handleClick() {
    console.log(`🚀 Клик по чату с ID: ${this.props.id}`);
    if (this.props.events?.click) {
      //@ts-expect-error null
      this.props.events.click();
    }
  }

  render() {
    const { name, avatar, message, id } = this.props;

    return `
      <div class="chat-item ${this.props.events}">
        <div class="chat-item__avatar">
          <img src="${avatar}" alt="Avatar" class="chat-item__avatar-image">
        </div>
        <div class="chat-item__details">
          <div class="chat-item__name">Имя Чата: ${name}</div>
          <div class="chat-item__message">${message}</div>
          <div class="chat-item__message">ID ЧАТА: ${id}</div>

        </div>
        </div>
        `;
      }
    }
    // <div class="chat-item__unread">${unread ?? ''}</div>
