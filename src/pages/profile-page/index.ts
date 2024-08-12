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
      ...props,
      profile: new ProfileInfoComponent({
        name: props?.name ,
        email: props?.email ,
        loginName: props?.loginName ,
        firstName: props?.firstName ,
        secondName: props?.secondName ,
        chatName: props?.chatName ,
        phone: props?.phone,
        photoUrl: props?.photoUrl,
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

