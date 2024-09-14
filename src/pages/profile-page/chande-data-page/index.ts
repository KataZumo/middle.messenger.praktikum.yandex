import "./chande-data-page.scss";
import Block from "../../../tools/Block";
import { Button } from "../../../components";
import ProfileInfoChangeComponent from "../../../components/profile-info-change";
import userApi from "../../../api/userApi";

interface ChangeDataPageProps {
  name: string;
  email: string;
  loginName: string;
  firstName: string;
  secondName: string;
  chatName: string;
  phone: string;
  photoUrl: string;
}

export default class ChangeDataPage extends Block {
  private profileInfo: ProfileInfoChangeComponent;

  constructor(props: ChangeDataPageProps) {
    const profileInfo = new ProfileInfoChangeComponent({
      name: props.name,
      email: props.email,
      loginName: props.loginName,
      firstName: props.firstName,
      secondName: props.secondName,
      chatName: props.chatName,
      phone: props.phone,
      photoUrl: props.photoUrl,
    });

    super({
      ...props,
      profile: profileInfo,
      submitButton: new Button({
        text: "Сохранить",
        type: "submit",
        className: "change-button",
        events: {
          click: (e: any) => this.handleSaveClick(e),
        },
      }),
    });

    this.profileInfo = profileInfo; // Сохраняем ссылку на компонент профиля
  }

  handleSaveClick(event: Event) {
    event.preventDefault();
    // Вызов метода handleSaveClick из ProfileInfoChangeComponent
    this.profileInfo.handleSaveClick(event);
  }

  override render() {
    return `<div class="change-data-page">
        <div class="change-data-page__content">
          {{{profile}}}
          {{{submitButton}}}
        </div>
      </div>`;
  }
}
