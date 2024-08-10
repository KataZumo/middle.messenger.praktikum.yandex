import Block from "../../tools/Block";
import Button from "../../components/button";
import InputComponent from "../../components/input";
import Link from "../../components/link";
import "./register.scss";
import Title from "../../components/title/title";
import AuthAPI from "../../api/userAPI";
import { host } from "../../api/api";
import TextComponent from "../../components/text/text";
import Router from "../../tools/Router";

export default class RegisterPage extends Block {
  private authAPI: AuthAPI;

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
      }),
      secondNameInput: new InputComponent({
        type: "text",
        className: "input",
        onChange: (value: string) => {
          console.log("Second Name:", value);
        },
      }),
      loginInput: new InputComponent({
        type: "login",
        className: "input",
        onChange: (value: string) => {
          console.log("Login:", value);
        },
      }),
      emailInput: new InputComponent({
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
      passwordRepeatInput: new InputComponent({
        type: "password",
        className: "input",
        onChange: (value: string) => {
          console.log("Password Repeat:", value);
        },
      }),
      phoneInput: new InputComponent({
        type: "phone",
        className: "input",
        onChange: (value: string) => {
          console.log("Phone:", value);
        },
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
        href: "/login",
      }),
      errorMessage: new TextComponent({
        text: '',
        className: 'error-message',
      }),
    });
    this.authAPI = new AuthAPI();
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

    console.log('First Name:', firstName);
    console.log('Second Name:', secondName);
    console.log('Login:', login);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Password Repeat:', passwordRepeat);
    console.log('Phone:', phone);

    if (!firstName || !secondName || !login || !email || !password || !passwordRepeat || !phone) {
      return;
    }

    if (password !== passwordRepeat) {
      return;
    }

    this.authAPI.signup({
      first_name: firstName,
      second_name: secondName,
      login,
      email,
      password,
      phone
    })
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));

        const router = Router.getInstance();
        router.go('/chat'); 
      })
      .catch(error => {
        console.error('регистрация отвалилась:', error);
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
      </div>
    `;
  }
}



    // event.preventDefault();

    // const first_name = (this.children.firstNameInput as InputComponent).getValue();
    // const second_name = (this.children.secondNameInput as InputComponent).getValue();
    // const login = (this.children.loginInput as InputComponent).getValue();
    // const email = (this.children.emailInput as InputComponent).getValue();
    // const password = (this.children.passwordInput as InputComponent).getValue();
    // const phone = (this.children.phoneInput as InputComponent).getValue();

    // // Валидация данных
    // if (!first_name || !second_name || !login || !email || !password || !phone) {
    //   console.error('All fields are required');
    //   (this.children.errorMessage as TextComponent).setText('All fields are required');
    //   return;
    // }

    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailPattern.test(email)) {
    //   console.error('Invalid email format');
    //   (this.children.errorMessage as TextComponent).setText('Invalid email format');
    //   return;
    // }

    // const phonePattern = /^\d+$/;
    // if (!phonePattern.test(phone)) {
    //   console.error('Invalid phone format');
    //   (this.children.errorMessage as TextComponent).setText('Invalid phone format');
    //   return;
    // }

    // console.log('Registration data:', { first_name, second_name, login, email, password, phone });

    // this.authAPI.signup({ first_name, second_name, login, email, password, phone })
    //   .then(user => {
    //     console.log('User registered:', user);
    //     history.pushState({}, "", "/chat");
    //     window.dispatchEvent(new PopStateEvent("popstate"));
    //   })
    //   .catch(error => {
    //     console.error('Registration error:', error);
    //     if (error.message === 'Login already exists') {
    //       (this.children.errorMessage as TextComponent).setText('Login already exists');
    //     } else {
    //       (this.children.errorMessage as TextComponent).setText('Registration error');
    //     }
    //   });
