import { Link } from "../../components";
import Block from "../../tools/Block";

export default class ErrorPage500 extends Block {
  constructor(props: any = {}) {
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
        <h1>500 - Внутренняя ошибка сервера</h1>
        <p>К сожалению, произошла ошибка на сервере. Пожалуйста, попробуйте позже.</p>
        {{{link}}}
      </div>
    `;
  }
}
