import "./chande-data-page.scss";
import Block from "../../../tools/Block";
import { Button } from "../../../components";
import ProfileInfoChangeComponent from "../../../components/profile-info-change";

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
  constructor(props: ChangeDataPageProps) {
    super({
      ...props,
      profile: new ProfileInfoChangeComponent({
        name: props.name,
        email: props.email,
        loginName: props.loginName,
        firstName: props.firstName,
        secondName: props.secondName,
        chatName: props.chatName,
        phone: props.phone,
        photoUrl: props.photoUrl,
      }),
      submitButton: new Button({
        text: "Сохранить",
        type: "submit",
        className: "change-button",
        events: {
          click: (e: any) => this.handleLoginClick(e),
        },
      }),
    });
  }

  handleLoginClick(event: Event) {
    event.preventDefault();
    history.pushState({}, "", "/profile");
    window.dispatchEvent(new PopStateEvent("popstate"));
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
