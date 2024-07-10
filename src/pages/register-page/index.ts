import Block from "../../tools/Block";
import Button from "../../components/button";
import InputComponent from "../../components/input";
import Link from "../../components/link";
import "./register.scss";
import Title from "../../components/title/title";

export default class RegisterPage extends Block {
  constructor(props: any = {}) {
    super({
      ...props,
      title: new Title({
        text: "Регистрация",
      }),
      emailInput: new InputComponent({
        type: "email",
        className: "input",
        onChange: (value: string) => {
          console.log("Email:", value);
        },
      }),
      loginInput: new InputComponent({
        type: "login",
        className: "input",
        onChange: (value: string) => {
          console.log("Login:", value);
        },
      }),
      firstNameInput: new InputComponent({
        type: "text",
        className: "input",
        onChange: (value: string) => {
          console.log("First Name:", value);
        },
      }),
      secondNameInput: new InputComponent({
        type: "text",
        className: "input",
        onChange: (value: string) => {
          console.log("Second Name:", value);
        },
      }),
      passwordInput: new InputComponent({
        type: "password",
        className: "input",
        onChange: (value: string) => {
          console.log("Password:", value);
        },
      }),
      passwordRepeatInput: new InputComponent({
        type: "password",
        className: "input",
        onChange: (value: string) => {
          console.log("Password Repeat:", value);
        },
      }),
      submitButton: new Button({
        text: "Зарегистрироваться",
        type: "submit",
        className: "register-button",
      }),
      loginLink: new Link({
        text: "Войти",
        className: "register-link",
        href: "/login",
      }),
    });
  }

  render() {
    return `
      <div class="register-page">
        {{{title}}}
        <form class="register-form">
          {{{emailInput}}}
          {{{loginInput}}}
          {{{firstNameInput}}}
          {{{secondNameInput}}}
          {{{passwordInput}}}
          {{{passwordRepeatInput}}}
          <div class="register-form-bottom">
            {{{submitButton}}}
            {{{loginLink}}}
          </div>
        </form>
      </div>
    `;
  }
}
