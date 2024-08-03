import ProfileInfoComponent from "../../components/profile-info";
import Block from "../../tools/Block";
import "./profile-page.scss";

interface ProfilePageProps {
  name: string;
  email: string;
  loginName: string;
  firstName: string;
  secondName: string;
  chatName: string;
  phone: string;
  photoUrl: string;
  [key: string]: any;
}
export default class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super({
      props,
      profile: new ProfileInfoComponent({
        name: props.name || "GROGI",
        email: props.email || "qwerty@gmail.com",
        loginName: props.loginName || "Grogi",
        firstName: props.firstName || "LOLOLO",
        secondName: props.secondName || "KEK",
        chatName: props.chatName || "infinity",
        phone: props.phone || "1-2-3-4-5-6",
        photoUrl: props.photoUrl || "default-avatar-url",
      }),
    });
  }

  override render() {
    return `<div class="profile-page">
      <div class="profile-page__content">
        {{{profile}}}
      </div>
      <div class="profile-page__left">
        <div class="profile-page__nav-btn" page="chat">Назад</div>
      </div>
    </div>`;
  }
}

