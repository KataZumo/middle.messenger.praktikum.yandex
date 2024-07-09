// import './error-404.scss';
// export { default as Error404Page } from './error-404.hbs?raw';

import { Link } from "../../components";
import Block from "../../tools/Block";

export default class ErrorPage extends Block {
  constructor(props: any) {
    super({
      ...props,
      link: new Link({
        text: "Вернуться на главную",
        className: "error-page__link",
        href: "/",
      }),
    });
  }

  render() {
    return `
      <div class="error-page">
        <h1>404 - Страница не найдена</h1>
        <p>К сожалению, страница, которую вы ищете, не существует.</p>
        {{{link}}}
      </div>
    `;
  }
}
