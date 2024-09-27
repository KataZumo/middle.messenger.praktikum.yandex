import Block from "../../tools/Block";
import "./profile-info.scss";
import Title from "../title/title";
import { Link } from "..";
import ProfilePhotoComponent from "../photo/ProfilePhotoComponent";
import AuthAPI from "../../api/authAPI";

interface ProfilePageProps {
  name: string;
  email: string;
  loginName: string;
  firstName: string;
  secondName: string;
  chatName: string;
  phone: string;
  photoUrl: string;
}

export default class ProfileInfoComponent extends Block {
  authAPI: AuthAPI;
  
  constructor(props: ProfilePageProps) {
    const profilePhoto = new ProfilePhotoComponent({
      avatar: props.photoUrl,
      onClick: () => {},
    });
    
    super({
      ...props,
      profilePhoto,
      emailInfo: new Title({
        className: "profile-info__value",
        text: props.email
      }),
      login: new Title({
        className: "profile-info__value",
        text: props.loginName
      }),
      firstName: new Title({
        className: "profile-info__value",
        text: props.firstName
      }),
      secondName: new Title({
        className: "profile-info__value",
        text: props.secondName 
      }),
      chatName: new Title({
        className: "profile-info__value",
        text: props.chatName 
      }),
      phone: new Title({
        className: "profile-info__value",
        text: props.phone
      }),
      changeData: new Link({
        text: "Изменить данные",
        // href: "/change-data",
        href: "/settings",
        className: "chat-page__profile-link",
      }),
      changePassword: new Link({
        text: "Изменить пароль",
        href: "/change-password",
        className: "chat-page__profile-link",
      }),
      exitLink: new Link({
        text: "Выйти",
        href: "#",
        className: "chat-page__profile-link",
        events: {
          click: () => this.handleLogout(), 
        },
      }),
    });
    this.authAPI = new AuthAPI();
  }

  handleLogout() {
    this.authAPI.logout().then(() => {
      window.location.href = "/";
      // window.location.href = "/login";
    }).catch((err) => {
      console.error('Logout failed', err);
    });
  }

  override render() {
    return `<div class="profile-page">
              <div class="profile-page__content">
                {{{profilePhoto}}}
                <div class="profile-main-info__user-name" style="margin-top: 30px; font-weight: bold;">
                Имя Пользователя: {{name}}
              </div>
                  </div>
                    <div class="profile-main-info__item">
                    <span class="profile-main-info__label">Имейл:</span>
                    {{{emailInfo}}}
                  </div>
                  <div class="profile-main-info__item">
                    <span class="profile-main-info__label">Логин:</span>
                    {{{login}}}
                  </div>
                  <div class="profile-main-info__item">
                    <span class="profile-main-info__label">Имя:</span>
                    {{{firstName}}}
                  </div>
                  <div class="profile-main-info__item">
                    <span class="profile-main-info__label">Фамилия:</span>
                    {{{secondName}}}
                  </div>
                  <div class="profile-main-info__item">
                    <span class="profile-main-info__label">Имя в чате:</span>
                    {{{chatName}}}
                  </div>
                  <div class="profile-main-info__item">
                    <span class="profile-main-info__label">Номер телефона:</span>
                    {{{phone}}}
                  </div>
                  <div class="profile-main-info__link-container">
                    {{{changeData}}}
                    {{{changePassword}}}
                    {{{exitLink}}}
                  </div>
              </div>
          </div>`;
  }
}
