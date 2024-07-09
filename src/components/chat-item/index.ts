import Block from "../../tools/Block";
import "./chat-item.scss";

interface ChatItemProps {
  avatar?: string;
  message: string;
  current?: boolean;
  name?: string;
  unread?: number;
}

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <div class="chat-item{{#if current}} chat-item--current{{/if}}">
        <div class="chat-item__avatar">
          {{#if avatar}}
            <img src="{{avatar}}" alt="Avatar">
          {{else}}
            <div class="chat-item__avatar-placeholder"></div>
          {{/if}}
        </div>
        <div class="chat-item__details">
          <div class="chat-item__name">{{name}}</div>
          <div class="chat-item__message">{{message}}</div>
        </div>
        {{#if unread}}
          <div class="chat-item__unread">{{unread}}</div>
        {{/if}}
      </div>
    `;
  }
}
