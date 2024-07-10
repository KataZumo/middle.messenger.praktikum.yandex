import Block from "../../tools/Block";
import Title from "../title/title";
import ModalComponent from "../modal";
import ProfilePhotoComponent from "../photo/ProfilePhotoComponent";

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
//       emailInfo: new Title({
//         className: "profile-info__value",
//         text: "*****",
//       }),
//       login: new Title({
//         className: "profile-info__value",
//         text: "*****",
//       }),
//       firstName: new Title({
//         className: "profile-info__value",
//         text: "*****",
//       }),
//       secondName: new Title({
//         className: "profile-info__value",
//         text: "*****",
//       }),
//       chatName: new Title({
//         className: "profile-info__value",
//         text: "*****",
//       }),
//       phone: new Title({
//         className: "profile-info__value",
//         text: "*****",
//       }),
//     });

//     this.modal = modal;
//   }

//   override render() {
//     return `<div class="profile-info">
//       <div class="profile-info__photo-container" onclick="{{onPhotoClick}}">
//         {{{profilePhoto}}}
//       </div>
//       <h1 class="profile-info__name">{{name}}</h1>
//       <div class="profile-info__item">
//         <span class="profile-info__label">Имейл:</span>
//         {{{emailInfo}}}
//       </div>
//       <div class="profile-info__item">
//         <span class="profile-info__label">Логин:</span>
//         {{{login}}}
//       </div>
//       <div class="profile-info__item">
//         <span class="profile-info__label">Имя:</span>
//         {{{firstName}}}
//       </div>
//       <div class="profile-info__item">
//         <span class="profile-info__label">Фамилия:</span>
//         {{{secondName}}}
//       </div>
//       <div class="profile-info__item">
//         <span class="profile-info__label">Имя в чате:</span>
//         {{{chatName}}}
//       </div>
//       <div class="profile-info__item">
//         <span class="profile-info__label">Номер телефона:</span>
//         {{{phone}}}
//       </div>
//       {{{modal}}}
//     </div>`;
//   }
// }

export default class ProfileInfoChangeComponent extends Block {
  modal: ModalComponent;

  constructor(props: ProfileChangePageProps) {
    const modal = new ModalComponent({
      onApply: () => console.log("File applied"),
    });
    const profilePhoto = new ProfilePhotoComponent({
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5y_CQNi9oiqn96_0204tGgLQuUxigGKLe1w&s",
      onClick: () => modal.show(),
    });

    super({
      ...props,
      modal,
      profilePhoto,
      emailInfo: new Title({
        className: "profile-info__value",
        text: "qwerty@gmail.com",
      }),
      login: new Title({
        className: "profile-info__value",
        text: "Grogi",
      }),
      firstName: new Title({
        className: "profile-info__value",
        text: "LOLOLO",
      }),
      secondName: new Title({
        className: "profile-info__value",
        text: "KEK",
      }),
      chatName: new Title({
        className: "profile-info__value",
        text: "infinity",
      }),
      phone: new Title({
        className: "profile-info__value",
        text: "1-2-3-4-5-6",
      }),
    });

    this.modal = modal;
  }

  override render() {
    return `<div class="profile-info">
      <div class="profile-info__photo-container" onclick="{{onPhotoClick}}">
        {{{profilePhoto}}}
      </div>
      <h1 class="profile-info__name">{{name}}</h1>
      <div class="profile-info__item">
        <span class="profile-info__label">Имейл:</span>
        {{{emailInfo}}}
      </div>
      <div class="profile-info__item">
        <span class="profile-info__label">Логин:</span>
        {{{login}}}
      </div>
      <div class="profile-info__item">
        <span class="profile-info__label">Имя:</span>
        {{{firstName}}}
      </div>
      <div class="profile-info__item">
        <span class="profile-info__label">Фамилия:</span>
        {{{secondName}}}
      </div>
      <div class="profile-info__item">
        <span class="profile-info__label">Имя в чате:</span>
        {{{chatName}}}
      </div>
      <div class="profile-info__item">
        <span class="profile-info__label">Номер телефона:</span>
        {{{phone}}}
      </div>
      <div class="profile-info__modal">
        {{{modal}}}
      </div>
    </div>`;
  }
}
