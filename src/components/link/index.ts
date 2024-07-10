import Block from "../../tools/Block";

interface LinkProps {
  text: string;
  href: string;
  className?: string;
}

export default class LinkComponent extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return `
      <a href="{{href}}" class="{{className}}">{{text}}</a>
    `;
  }
}
