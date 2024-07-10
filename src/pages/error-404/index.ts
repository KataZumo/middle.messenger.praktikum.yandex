import { Link } from "../../components";
import Block from "../../tools/Block";

interface ErrorProps {
  text: string;
  className: string;
  href: string;
}
export default class ErrorPage extends Block {
  constructor(props: ErrorProps) {
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
