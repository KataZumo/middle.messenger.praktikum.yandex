import Block from "../../tools/Block";
import "./input.scss";

// interface InputProps {
//   placeholder?: string;
//   type: string;
//   className?: string;
//   events?: {
//     change?: (event: Event) => void;
//     blur?: (event: Event) => void;
//   };
//   onChange: (value: string) => void;
// }

// export default class InputComponent extends Block {
//   constructor(props: InputProps) {
//     super({
//       ...props,
//       events: {
//         change: (e: Event) =>
//           props.onChange((e.target as HTMLInputElement).value),
//         blur: (e: Event) => this.validate(),
//       },
//     });
//   }

//   render() {
//     return `
//     <input type="{{type}}" class="{{className}}" />
//     <div class="input__error-message"></div>
//     `;
//   }

//   validate() {
//     const inputElement = this.getContent() as HTMLInputElement;
//     const value = inputElement.value;
//     const type = inputElement.type;

//     let isValid = false;
//     switch (type) {
//       case "text":
//         isValid = this.validateText(value);
//         break;
//       case "login":
//         isValid = this.validateLogin(value);
//         break;
//       case "email":
//         isValid = this.validateEmail(value);
//         break;
//       case "password":
//         isValid = this.validatePassword(value);
//         break;
//       case "phone":
//         isValid = this.validatePhone(value);
//         break;
//       default:
//         console.error("Не известный тип валидации");
//         return false;
//     }

//     if (!isValid) {
//       console.error(`Валидация не прошла для: ${type}. Проверьте корректность данных`);
//       return false;
//     }

//     console.log("Ура! Валидация прогла успешно");
//     return true;
//   }

//   validateText(value: string): boolean {
//     const textRegex = /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/;
//     return textRegex.test(value);
//   }

//   validateLogin(value: string): boolean {
//     const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
//     return loginRegex.test(value);
//   }

//   validateEmail(value: string): boolean {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(value);
//   }

//   validatePassword(value: string): boolean {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
//     return passwordRegex.test(value);
//   }

//   validatePhone(value: string): boolean {
//     const phoneRegex = /^\+?\d{10,15}$/;
//     return phoneRegex.test(value);
//   }
// }

// =============
// TODO: тут я хотел сделать валидация и показать сообщение в котором указывалась ошибка, но input никак не обнаруживался :((
// export default class InputComponent extends Block {
//   constructor(props: InputProps) {
//     super({
//       ...props,
//       events: {
//         change: (e: Event) =>
//           props.onChange((e.target as HTMLInputElement).value),
//         blur: (e: Event) => this.validate(),
//       },
//     });
//     console.log("InputComponent initialized with props:", props);
//   }

//   render() {
//     return `
//       <div class="input">
//         <input type="{{type}}" class="input__element" />
//         <div class="input__error-message"></div>
//       </div>
//     `;
//   }

//   validate() {
//     console.log("начало");

//     const container = this.getContent() as HTMLElement;
//     if (!container) {
//       return false;
//     }
//     console.log( container);

//     const inputElement = container.querySelector("input__element") as HTMLInputElement;
//     console.log("🚀 ~ InputComponent ~ validate ~ inputElement:", inputElement)
//     if (!inputElement) {
//       console.error("ошибка")
//       return false;
//     }
//     console.log( inputElement);

//     const errorMessageElement = container.querySelector("input__error-message") as HTMLDivElement;
//     if (!errorMessageElement) {
//       console.error("ошибка")
//       return false;
//     }
//     console.log("Error message element found:", errorMessageElement);

//     const value = inputElement.value;
//     const type = inputElement.type;

//     console.log(`Validating input of type: ${type} with value: ${value}`);

//     let isValid = false;
//     let errorMessage = "";

//     switch (type) {
//       case "text":
//         isValid = this.validateText(value);
//         errorMessage = `First name or second name should be in Latin or Cyrillic, start with a capital letter, no spaces, no numbers, only hyphen is allowed.`;
//         break;
//       case "login":
//         isValid = this.validateLogin(value);
//         errorMessage = `Login should be 3-20 characters long, Latin letters, may include numbers but not consist of them, no spaces, only hyphen and underscore are allowed.`;
//         break;
//       case "email":
//         isValid = this.validateEmail(value);
//         errorMessage = `Email should be in Latin, may include numbers and special symbols like hyphen and underscore, must include "@" and a dot after it, but letters should precede the dot.`;
//         break;
//       case "password":
//         isValid = this.validatePassword(value);
//         errorMessage = `Password should be 8-40 characters long, must include at least one capital letter and one number.`;
//         break;
//       case "phone":
//         isValid = this.validatePhone(value);
//         errorMessage = `Phone should be 10-15 digits long, can start with a plus.`;
//         break;
//       default:
//         console.error("ошибка")
//         return false;
//     }

//     if (!isValid) {
//       inputElement.classList.add("input__element--invalid");
//       errorMessageElement.textContent = errorMessage;
//       console.error("ошибка")
//       return false;
//     } else {
//       inputElement.classList.remove("input__element--invalid");
//       errorMessageElement.textContent = "";
//       console.log("Validation passed");
//     }
//     console.log("🚀 ~ InputComponent ~ validate ~ inputElement:", inputElement)
//     return true;
//   }

//   validateText(value: string): boolean {
//     const textRegex = /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/;
//     return textRegex.test(value);
//   }

//   validateLogin(value: string): boolean {
//     const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
//     return loginRegex.test(value);
//   }

//   validateEmail(value: string): boolean {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(value);
//   }

//   validatePassword(value: string): boolean {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
//     return passwordRegex.test(value);
//   }

//   validatePhone(value: string): boolean {
//     const phoneRegex = /^\+?\d{10,15}$/;
//     return phoneRegex.test(value);
//   }
// }

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
        change: (e: Event) =>
          props.onChange((e.target as HTMLInputElement).value),
        blur: () => this.validate(),
      },
    });
  }

  render() {
    return `
      <input 
        type="{{type}}" 
        class="{{className}}" 
        value="{{value}}" 
        placeholder="{{placeholder}}" 
      />
      <div class="input__error-message"></div>
    `;
  }

  validate() {
    const inputElement = this.getContent() as HTMLInputElement;
    const value = inputElement.value;
    const type = inputElement.type;

    let isValid = false;
    switch (type) {
      case "text":
        isValid = this.validateText(value);
        break;
      case "login":
        isValid = this.validateLogin(value);
        break;
      case "email":
        isValid = this.validateEmail(value);
        break;
      case "password":
        isValid = this.validatePassword(value);
        break;
      case "phone":
        isValid = this.validatePhone(value);
        break;
      default:
        console.error("Unknown validation type");
        return false;
    }

    if (!isValid) {
      console.error(`Validation failed for: ${type}`);
      return false;
    }

    console.log("Validation passed successfully");
    return true;
  }

  validateText(value: string): boolean {
    const textRegex = /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/;
    return textRegex.test(value);
  }

  validateLogin(value: string): boolean {
    const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
    return loginRegex.test(value);
  }

  validateEmail(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }

  validatePassword(value: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    return passwordRegex.test(value);
  }

  validatePhone(value: string): boolean {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(value);
  }
}
