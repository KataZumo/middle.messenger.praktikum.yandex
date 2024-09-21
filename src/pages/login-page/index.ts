import Block from "../../tools/Block";
import Button from "../../components/button";
import InputComponent from "../../components/input";
import Link from "../../components/link";
import "./login-page.scss";
import Title from "../../components/title/title";
import { SigninData } from "../../api/type";
import AuthController from "../../controlers/authControlers"
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
  private isUserAuthenticated: boolean = false;

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
          }
        }
      }),
      registerLink: new Link({
        text: "Нет аккаунта?",
        className: "register-link",
        // href: "/register",
        href: "/sign-up"
      }),
    });

    AuthController.getUser().then((user) => {
      if (user) {
        this.isUserAuthenticated = true;
        const router = Router.getInstance();
        router.go('/messenger');
      }
    });
  }
  

  handleLoginClick(event: Event) {
    event.preventDefault();

    if (this.isUserAuthenticated) {
      const router = Router.getInstance();
      router.go('/messenger');
      return;
    }

    const login = (this.children.usernameInput as InputComponent).getValue();
    const password = (this.children.passwordInput as InputComponent).getValue();

    if (!login || !password) {
      console.error('Login and password are required.');
      return;
    }

    const data: SigninData = { login, password };
    AuthController.login(data)
      .then(() => console.log('User logged in successfully'))
      .catch(error => console.error('Login failed:', error));
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


