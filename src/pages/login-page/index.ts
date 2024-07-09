import Block from "../../tools/Block";
import Button from "../../components/button";
import InputComponent from "../../components/input";
import Link from "../../components/link";
import "./login-page.scss";
import Title from "../../components/title/title";

interface LoginPageProps {
  title?: Title;
  usernameInput?: InputComponent;
  passwordInput?: InputComponent;
  submitButton?: Button;
  registerLink?: Link;
  [key: string]: unknown;
}
export default class LoginPage extends Block {
  constructor(props: LoginPageProps = {}) {
    super({
      ...props,
      title: new Title({
        text: "Вход",
      }),
      usernameInput: new InputComponent({
        type: "email",
        className: "input",
        onChange: (value: string) => {
          console.log("Email:", value);
        },
      }),
      passwordInput: new InputComponent({
        type: "password",
        className: "input",
        onChange: (value: string) => {
          console.log("Password:", value);
        },
      }),
      submitButton: new Button({
        text: "Авторизоваться",
        type: "submit",
        className: "login-button",
        events: {
          click: (event: Event) => {
            this.handleLoginClick(event);
            event.preventDefault();
            console.log("Клик");
          }}
      }),
      registerLink: new Link({
        text: "Нет аккаунта?",
        className: "register-link",
        href: "/register",
      }),
    });
  }

  handleLoginClick(event: Event) {
    event.preventDefault();
    history.pushState({}, "", "/chat");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  render() {
    return `
      <div class="login-page">
        {{{title}}}
        <form class="login-form">
          <div class="login_input">
            {{{usernameInput}}}
            {{{passwordInput}}}
          </div>
          <div class="login-form-bottom">
            {{{submitButton}}}
            {{{registerLink}}}
          </div>
        </form>
      </div>
    `;
  }
}
