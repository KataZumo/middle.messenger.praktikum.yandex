import Block from "../../tools/Block";
import Button from "../../components/button";
import InputComponent from "../../components/input";
import Link from "../../components/link";
import "./register.scss";
import Title from "../../components/title/title";
import TextComponent from "../../components/text/text";
import { SignUpRequest } from "../../api/type";
import AuthController from "../../controlers/authControlers"
import Router from "../../tools/Router";

export default class RegisterPage extends Block {
  constructor(props: any = {}) {
    super({
      ...props,
      title: new Title({
        text: "Регистрация",
      }),
      firstNameInput: new InputComponent({
        type: "text",
        className: "input",
        onChange: (value: string) => {
          console.log("First Name:", value);
        },
        placeholder: "Имя"
      }),
      secondNameInput: new InputComponent({
        type: "text",
        className: "input",
        onChange: (value: string) => {
          console.log("Second Name:", value);
        },
        placeholder: "Фамилия"
      }),
      loginInput: new InputComponent({
        type: "login",
        className: "input",
        onChange: (value: string) => {
          console.log("Login:", value);
        },
        placeholder: "Имя в чате"
      }),
      emailInput: new InputComponent({
        type: "email",
        className: "input",
        onChange: (value: string) => {
          console.log("Email:", value);
        },
        placeholder: "Email"
      }),
      passwordInput: new InputComponent({
        type: "password",
        className: "input",
        onChange: (value: string) => {
          console.log("Password:", value);
        },
        placeholder: "Пароль"
      }),
      passwordRepeatInput: new InputComponent({
        type: "password",
        className: "input",
        onChange: (value: string) => {
          console.log("Password Repeat:", value);
        },
        placeholder: "Повторите пароль"
      }),
      phoneInput: new InputComponent({
        type: "phone",
        className: "input",
        onChange: (value: string) => {
          console.log("Phone:", value);
        },
        placeholder: "Номер телефона"
      }),
      submitButton: new Button({
        text: "Зарегистрироваться",
        type: "submit",
        className: "register-button",
        events: {
          click: (event: Event) => {
            this.handleRegisterClick(event);
            event.preventDefault();
            console.log('Клик на регистрацию');
          },
        }
      }),
      loginLink: new Link({
        text: "Войти",
        className: "register-link",
        href: "/",
        // href: "/login",
      }),
      errorMessage: new TextComponent({
        text: '',
        className: 'error-message',
      }),
    });

    AuthController.getUser().then((user) => {
      if (user) {
        const router = Router.getInstance();
        router.go('/messenger');
      }
    });
  }

  handleRegisterClick(event: Event) {
    event.preventDefault();

    const firstName = (this.children.firstNameInput as InputComponent).getValue();
    const secondName = (this.children.secondNameInput as InputComponent).getValue();
    const login = (this.children.loginInput as InputComponent).getValue();
    const email = (this.children.emailInput as InputComponent).getValue();
    const password = (this.children.passwordInput as InputComponent).getValue();
    const passwordRepeat = (this.children.passwordRepeatInput as InputComponent).getValue();
    const phone = (this.children.phoneInput as InputComponent).getValue();

    if (!firstName || !secondName || !login || !email || !password || !passwordRepeat || !phone) {
      return;
    }

    if (password !== passwordRepeat) {
      return;
    }

    const data: SignUpRequest = {
      first_name: firstName,
      second_name: secondName,
      login,
      email,
      password,
      phone
    };

    AuthController.register(data)
      .then(() => console.log('пользователь успешно зхарегестрирован'))
      .catch(error => {
        console.error('Ошибка при регистрации', error);
        (this.children.errorMessage as TextComponent).setText(error.message);
      });
  }

  render() {
    return `
      <div class="register-page">
        {{{title}}}
        <form class="register-form">
        {{{firstNameInput}}}
        {{{secondNameInput}}}
        {{{loginInput}}}
          {{{emailInput}}}
          {{{passwordInput}}}
          {{{passwordRepeatInput}}}
          {{{phoneInput}}}
          <div class="register-form-bottom">
            {{{submitButton}}}
            {{{loginLink}}}
          </div>
        </form>
        {{{errorMessage}}}
      </div>
    `;
  }
}
