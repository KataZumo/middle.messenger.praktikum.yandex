import Block from "../../tools/Block";
import ModalComponent from "../modal";
import ProfilePhotoComponent from "../photo/ProfilePhotoComponent";
import InputComponent from "../input";

interface ProfileChangePageProps {
  name: string;
  email: string;
  loginName: string;
  firstName: string;
  secondName: string;
  chatName: string;
  phone: string;
  photoUrl: string;
}

// export default class ProfileInfoChangeComponent extends Block {
//   modal: ModalComponent;

//   constructor(props: ProfileChangePageProps) {
//     const modal = new ModalComponent({
//       onApply: () => console.log("File applied"),
//     });
//     const profilePhoto = new ProfilePhotoComponent({
//       avatar:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5y_CQNi9oiqn96_0204tGgLQuUxigGKLe1w&s",
//       onClick: () => modal.show(),
//     });

//     super({
//       ...props,
//       modal,
//       profilePhoto,
//       emailInput: new InputComponent({
//         type: 'email',
//         className: 'profile-info__input',
//         value: 'qwerty@gmail.com',
//         placeholder: 'Введите ваш имейл',
//         onChange: (value) => this.onInputChange('email', value),
//       }),
//       loginInput: new InputComponent({
//         type: 'text',
//         className: 'profile-info__input',
//         value: 'Grogi',
//         placeholder: 'Введите ваш логин',
//         onChange: (value) => this.onInputChange('login', value),
//       }),
//       firstNameInput: new InputComponent({
//         type: 'text',
//         className: 'profile-info__input',
//         value: 'LOLOLO',
//         placeholder: 'Введите ваше имя',
//         onChange: (value) => this.onInputChange('firstName', value),
//       }),
//       secondNameInput: new InputComponent({
//         type: 'text',
//         className: 'profile-info__input',
//         value: 'KEK',
//         placeholder: 'Введите вашу фамилию',
//         onChange: (value) => this.onInputChange('secondName', value),
//       }),
//       chatNameInput: new InputComponent({
//         type: 'text',
//         className: 'profile-info__input',
//         value: 'infinity',
//         placeholder: 'Введите ваше имя в чате',
//         onChange: (value) => this.onInputChange('chatName', value),
//       }),
//       phoneInput: new InputComponent({
//         type: 'phone',
//         className: 'profile-info__input',
//         value: '1-2-3-4-5-6',
//         placeholder: 'Введите ваш номер телефона',
//         onChange: (value) => this.onInputChange('phone', value),
//       }),
//     });

//     this.modal = modal;
//   }

//   onInputChange(field: string, value: string) {
//     this.setProps({ [field]: value });
//   }

//   handleSaveClick(event: Event) {
//     event.preventDefault();
//     // Логика сохранения изменений, например, отправка данных на сервер
//     console.log('Сохраненные данные:', this.props);
//     // Переход на страницу профиля после сохранения
//     history.pushState({}, '', '/profile');
//     window.dispatchEvent(new PopStateEvent('popstate'));
//   }

//   override render() {
//     return `<div class="profile-info">
//       <div class="profile-info__photo-container" onclick="{{onPhotoClick}}">
//         {{{profilePhoto}}}
//       </div>
//       <div class="profile-info__content">
//         <div class="profile-info__item">
//           <span class="profile-info__label">Имейл:</span>
//           {{{emailInput}}}
//         </div>
//         <div class="profile-info__item">
//           <span class="profile-info__label">Логин:</span>
//           {{{loginInput}}}
//         </div>
//         <div class="profile-info__item">
//           <span class="profile-info__label">Имя:</span>
//           {{{firstNameInput}}}
//         </div>
//         <div class="profile-info__item">
//           <span class="profile-info__label">Фамилия:</span>
//           {{{secondNameInput}}}
//         </div>
//         <div class="profile-info__item">
//           <span class="profile-info__label">Имя в чате:</span>
//           {{{chatNameInput}}}
//         </div>
//         <div class="profile-info__item">
//           <span class="profile-info__label">Номер телефона:</span>
//           {{{phoneInput}}}
//         </div>
//         <div class="profile-info__modal">
//           {{{modal}}}
//         </div>
//       </div>
//     </div>`;
//   }
// }


export default class ProfileInfoChangeComponent extends Block {
  modal: ModalComponent;

  constructor(props: ProfileChangePageProps) {
    // Инициализация модального компонента
    const modal = new ModalComponent({
      onApply: () => console.log("File applied"),
    });

    // Инициализация компонента фото профиля
    const profilePhoto = new ProfilePhotoComponent({
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5y_CQNi9oiqn96_0204tGgLQuUxigGKLe1w&s",
      onClick: () => modal.show(),
    });

    // Инициализация полей ввода
    const emailInput = new InputComponent({
      type: 'email',
      className: 'profile-info__input',
      value: 'qwerty@gmail.com',
      placeholder: 'Введите ваш имейл',
      onChange: (value) => this.onInputChange('email', value),
    });

    const loginInput = new InputComponent({
      type: 'text',
      className: 'profile-info__input',
      value: 'Grogi',
      placeholder: 'Введите ваш логин',
      onChange: (value) => this.onInputChange('login', value),
    });

    const firstNameInput = new InputComponent({
      type: 'text',
      className: 'profile-info__input',
      value: 'LOLOLO',
      placeholder: 'Введите ваше имя',
      onChange: (value) => this.onInputChange('firstName', value),
    });

    const secondNameInput = new InputComponent({
      type: 'text',
      className: 'profile-info__input',
      value: 'KEK',
      placeholder: 'Введите вашу фамилию',
      onChange: (value) => this.onInputChange('secondName', value),
    });

    const chatNameInput = new InputComponent({
      type: 'text',
      className: 'profile-info__input',
      value: 'infinity',
      placeholder: 'Введите ваше имя в чате',
      onChange: (value) => this.onInputChange('chatName', value),
    });

    const phoneInput = new InputComponent({
      type: 'phone',
      className: 'profile-info__input',
      value: '1-2-3-4-5-6',
      placeholder: 'Введите ваш номер телефона',
      onChange: (value) => this.onInputChange('phone', value),
    });

    // Вызов конструктора родительского класса
    super({
      ...props,
      modal,
      profilePhoto,
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      chatNameInput,
      phoneInput,
    });

    // Сохранение модального компонента
    this.modal = modal;
  }

  onInputChange(field: string, value: string) {
    if (this.validateInput(field, value)) {
      this.setProps({ [field]: value });
    }
  }

  validateInput(field: string, value: string): boolean {
    // Добавить проверку ввода для каждого поля
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return /^\d{1}-\d{1}-\d{1}-\d{1}-\d{1}-\d{1}$/.test(value);
      default:
        return true;
    }
  }

  handleSaveClick(event: Event) {
    event.preventDefault();
    // Логика сохранения изменений, например, отправка данных на сервер
    console.log('Сохраненные данные:', this.props);
    // Переход на страницу профиля после сохранения
    window.location.href = '/profile';
  }

  override render() {
    return `<div class="profile-info">
      <div class="profile-info__photo-container" onclick="{{onPhotoClick}}">
        {{{profilePhoto}}}
      </div>
      <div class="profile-info__content">
        <div class="profile-info__item">
          <span class="profile-info__label">Имейл:</span>
          {{{emailInput}}}
        </div>
        <div class="profile-info__item">
          <span class="profile-info__label">Логин:</span>
          {{{loginInput}}}
        </div>
        <div class="profile-info__item">
          <span class="profile-info__label">Имя:</span>
          {{{firstNameInput}}}
        </div>
        <div class="profile-info__item">
          <span class="profile-info__label">Фамилия:</span>
          {{{secondNameInput}}}
        </div>
        <div class="profile-info__item">
          <span class="profile-info__label">Имя в чате:</span>
          {{{chatNameInput}}}
        </div>
        <div class="profile-info__item">
          <span class="profile-info__label">Номер телефона:</span>
          {{{phoneInput}}}
        </div>
        <div class="profile-info__modal">
          {{{modal}}}
        </div>
      </div>
    </div>`;
  }
}
