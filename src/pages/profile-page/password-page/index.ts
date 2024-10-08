import Block from "../../../tools/Block";
import "./password-page.scss";
import { Button } from "../../../components";
import ProfilePhotoComponent from "../../../components/photo/ProfilePhotoComponent";
import InputComponent from "../../../components/input";
import Router from "../../../tools/Router";
import userAPI  from "../../../api/userAPI";

interface ChangePasswordPageProps {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export default class ChangePasswordPage extends Block {
  private router: Router;

  constructor(props: ChangePasswordPageProps) {
    const profilePhoto = new ProfilePhotoComponent({
      onClick() {},
    });

    super({
      ...props,
      profilePhoto,
      oldPassword: new InputComponent({
        type: "password",
        className: "change-password-page__input",
        value: props.oldPassword || "",
        placeholder: "Введите старый пароль",
        onChange: (value: string) => {
          this.setProps({ oldPassword: value });
        },
      }),
      newPassword: new InputComponent({
        type: "password",
        className: "change-password-page__input",
        value: props.newPassword || "",
        placeholder: "Новый пароль",
        onChange: (value: string) => {
          this.setProps({ newPassword: value });
        },
      }),
      repeatPassword: new InputComponent({
        type: "password",
        className: "change-password-page__input",
        value: props.repeatPassword || "",
        placeholder: "Повторите пароль",
        onChange: (value: string) => {
          this.setProps({ repeatPassword: value });
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
    //@ts-expect-error null
    this.router = new Router();
  }

  validatePasswords(): boolean {
    const { newPassword, repeatPassword } = this.props;

    if (newPassword !== repeatPassword) {
      console.error("Пароли не совпадают");
      return false;
    }

    if (!newPassword || !repeatPassword) {
      console.error("Пароли не должны быть пустыми");
      return false;
    }

    return true;
  }

  async handleSaveClick(event: Event) {
    event.preventDefault();

    if (!this.validatePasswords()) {
      return;
    }

    const data = {
      oldPassword: this.props.oldPassword,
      newPassword: this.props.newPassword,
    };

    try {
      await userAPI.changePassword(data as any);
      console.log("Пароль успешно изменен");

      this.router.go('/profile');
    } catch (error) {
      console.error("Ошибка при изменении пароля:", error);
    }
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

