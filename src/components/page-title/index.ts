import Block from "../../tools/Block";
import "./page-title.scss";

interface PageTitleProps {
  title: string;
}

export default class PageTitle extends Block {
  constructor(props: PageTitleProps) {
    super({...props});
  }

  render() {
    return `
      <h1 class="page-title">
        {{ title }}
      </h1>
    `;
  }
}
