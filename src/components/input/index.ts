import Block from "../../tools/Block";
import "./input.scss";
interface InputProps {
  type: string;
  className?: string;
  events?: {
    change?: (event: Event) => void;
    blur?: (event: Event) => void;
  };
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}
export default class InputComponent extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        change: (e: Event) => {
          const inputElement = e.target as HTMLInputElement;
          props.onChange(inputElement.value);
          this.validate();
        },
        blur: () => this.validate(),
      },
    });
  }

  render() {
    return `
      <div class="input">
        <input
          type="{{type}}"
          class="input__element{{#if isInvalid}} input__element--invalid{{/if}}"
          value="{{value}}"
          placeholder="{{placeholder}}"
        />
        <div class="input__error-message">{{errorMessage}}</div>
      </div>
    `;
  }

  validate() {
    const content = this.getContent();
    if (!content) {
      console.error("Content is null");
      return false;
    }

    const inputElement = content.querySelector('input') as HTMLInputElement;
    if (!inputElement) {
      return false;
    }

    const value = inputElement.value;
    const type = inputElement.type;
    const errorMessageElement = content.querySelector('.input__error-message') as HTMLElement;

    if (!errorMessageElement) {
      return false;
    }

    let isValid = false;
    let errorMessage = '';
    switch (type) {
      case "text":
        isValid = this.validateText(value);
        errorMessage = isValid ? '' : 'Invalid text';
        break;
      case "login":
        isValid = this.validateLogin(value);
        errorMessage = isValid ? '' : 'Invalid login';
        break;
      case "email":
        isValid = this.validateEmail(value);
        errorMessage = isValid ? '' : 'Invalid email';
        break;
      case "password":
        isValid = this.validatePassword(value);
        errorMessage = isValid ? '' : 'Invalid password';
        break;
      case "phone":
        isValid = this.validatePhone(value);
        errorMessage = isValid ? '' : 'Invalid phone';
        break;
      default:
        console.error("Unknown validation type");
        return false;
    }

    if (!isValid) {
      errorMessageElement.textContent = errorMessage;
      inputElement.classList.add('input__element--invalid');
      console.error(`валидация на прошла для: ${type}`);
      return false;
    }

    errorMessageElement.textContent = '';
    inputElement.classList.remove('input__element--invalid');
    return true;
  }

  validateText(value: string): boolean {
    const textRegex = /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/;
    return textRegex.test(value);
  }

  validateLogin(value: string): boolean {
    // const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
    // return loginRegex.test(value);
    return true;
  }

  validateEmail(value: string): boolean {
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // return emailRegex.test(value);
    return true;
  }

  validatePassword(value: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    return passwordRegex.test(value);
  }

  validatePhone(value: string): boolean {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(value);
  }

  getValue(): string {
    const inputElement = this.element?.querySelector('input');
    if (inputElement) {
      return inputElement.value;
    }
    return '';
  }

}
