import Block from "../../tools/Block";
import ChatItem from "../chat-item";
import "./chat-list.scss";

interface ChatListProps {
  className?: string;
  chats: Array<{
    name: string;
    message: string;
    unread: number;
    avatar?: string;
  }>;
}

export default class ChatList extends Block {
  constructor(props: ChatListProps) {
    const chatItems = props.chats.map((chat) => new ChatItem(chat));
    super({
      ...props,
      chatItems,
    });
  }

  render() {
    return `
      <div class="chat-list{{#if className}} {{className}}{{/if}}">
        {{#each chats}}
          {{{chatItems}}}
        {{/each}}
      </div>
    `;
  }
}
