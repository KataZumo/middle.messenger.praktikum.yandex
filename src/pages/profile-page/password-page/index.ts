import Block from "../../../tools/Block";
import "./password-page.scss";
import { Button } from "../../../components";
import ProfilePhotoComponent from "../../../components/photo/ProfilePhotoComponent";
import InputComponent from "../../../components/input";

interface ChangePasswordPageProps {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export default class ChangePasswordPage extends Block {
  constructor(props: ChangePasswordPageProps) {
    const profilePhoto = new ProfilePhotoComponent({
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5y_CQNi9oiqn96_0204tGgLQuUxigGKLe1w&s",
      onClick: () => "",
    });
    super({
      ...props,
      profilePhoto,
      oldPassword: new InputComponent({
        type: "password",
        className: "change-password-page__input",
        value: "",
        placeholder: "Введите старый пароль",
        onChange: (value: string) => {
          console.log("Old Password:", value);
        },
      }),
      newPassword: new InputComponent({
        type: "password",
        className: "change-password-page__input",
        value: "",
        placeholder: "Новый пароль",
        onChange: (value: string) => {
          console.log("New Password:", value);
        },
      }),
      repeatPassword: new InputComponent({
        type: "password",
        className: "change-password-page__input",
        value: "",
        placeholder: "Повторите пароль",
        onChange: (value: string) => {
          console.log("Repeat Password:", value);
        },
      }),
      saveButton: new Button({
        text: "Сохранить",
        className: "save-button",
        events: {
          click: (e: Event) => this.handleSaveClick(e),
        },
      }),
    });
  }

  handleSaveClick(event: Event) {
    event.preventDefault();
    history.pushState({}, "", "/profile");
    window.dispatchEvent(new PopStateEvent("popstate"));
    console.log("Пароль изменен");
  }

  override render() {
    return `<div class="change-password-page">
      <div class="change-password-page__content">
        {{{profilePhoto}}}
        <div class="buttons-place">
          <div class="change-password-page__item">
            <span class="change-password-page__label">Старый пароль</span>
            {{{oldPassword}}}
          </div>
          <div class="change-password-page__item">
            <span class="change-password-page__label">Новый пароль</span>
            {{{newPassword}}}
          </div>
          <div class="change-password-page__item">
            <span class="change-password-page__label">Повторите пароль</span>
            {{{repeatPassword}}}
          </div>
        </div>
        {{{saveButton}}}
      </div>
    </div>`;
  }
}
