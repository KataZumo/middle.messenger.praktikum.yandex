import Block from "../../tools/Block";
import "./profile-info.scss";
import Title from "../title/title";
import { Link } from "..";
import ModalComponent from "../modal";
import ProfilePhotoComponent from "../photo/ProfilePhotoComponent";

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
  modal: ModalComponent;
  
  constructor(props: ProfilePageProps) {
    const modal = new ModalComponent({
      onApply: () => console.log("File applied"),
    });
    const profilePhoto = new ProfilePhotoComponent({
      avatar: props.photoUrl ,
      onClick: () => modal.show(),
    });
    
    super({
      ...props,
      modal,
      profilePhoto,
      name: new Title({
        className: "profile-info__value",
        text: props.name || "GROGI",
      }),
      emailInfo: new Title({
        className: "profile-info__value",
        text: props.email || "Unknown",
      }),
      login: new Title({
        className: "profile-info__value",
        text: props.loginName || "Unknown",
      }),
      firstName: new Title({
        className: "profile-info__value",
        text: props.firstName || "Unknown",
      }),
      secondName: new Title({
        className: "profile-info__value",
        text: props.secondName || "Unknown",
      }),
      chatName: new Title({
        className: "profile-info__value",
        text: props.chatName || "Unknown",
      }),
      phone: new Title({
        className: "profile-info__value",
        text: props.phone || "Unknown",
      }),
      changeData: new Link({
        text: "Изменить данные",
        href: "/change-data",
        className: "chat-page__profile-link",
      }),
      changePassword: new Link({
        text: "Изменить пароль",
        href: "/change-password",
        className: "chat-page__profile-link",
      }),
      exitLink: new Link({
        text: "Выйти",
        href: "/login",
        className: "chat-page__profile-link",
      }),
    });
    
    this.modal = modal;
  }

  override render() {
    return `<div class="profile-page">
              <div class="profile-page__content">
                {{{profilePhoto}}}
                {{name}}
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
                {{{modal}}}
              </div>
          </div>`;
  }
}


// <h1 class="profile-main-info__name">{{name}}</h1>
