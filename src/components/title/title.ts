import Block from "../../tools/Block";
import "./title.scss";

interface TitleProps {
  text?: string;
  className?: string;
}
export default class Title extends Block {
  constructor(props: TitleProps) {
    super({
      ...props,
    });
  }

  render() {
    return `<span class="subtitle">{{text}}</span>`;
  }
}
