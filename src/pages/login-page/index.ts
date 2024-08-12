import Block from "../../tools/Block";
import Button from "../../components/button";
import InputComponent from "../../components/input";
import Link from "../../components/link";
import "./login-page.scss";
import Title from "../../components/title/title";
import AuthAPI from "../../api/authAPI";
import { host } from "../../api/api";
import UserLoginController from "./UserLoginController";
import Router from "../../tools/Router";

interface LoginPageProps {
  title?: Title;
  usernameInput?: InputComponent;
  passwordInput?: InputComponent;
  submitButton?: Button;
  registerLink?: Link;
  [key: string]: unknown;
}
export default class LoginPage extends Block {
  private authAPI: AuthAPI;

  constructor(props: LoginPageProps = {}) {
    super({
      ...props,
      title: new Title({
        text: "Вход",
      }),
      usernameInput: new InputComponent({
        type: "login",
        className: "input",
        onChange: (value: string) => {
          console.log("Login:", value);
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

    this.authAPI = new AuthAPI();
  }


  handleLoginClick(event: Event) {
    event.preventDefault();

    const login = (this.children.usernameInput as InputComponent).getValue();
    const password = (this.children.passwordInput as InputComponent).getValue();

    if (!login || !password) {
      return;
    }

    this.authAPI.login({ login, password })
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        const router = Router.getInstance(); 
        router.go('/chat'); 
      })
      .catch(error => {
        console.error('Signin error:', error);
      });
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


