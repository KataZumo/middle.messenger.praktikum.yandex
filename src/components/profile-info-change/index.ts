import Block from "../../tools/Block";
import ModalComponent from "../modal";
import ProfilePhotoComponent from "../photo/ProfilePhotoComponent";
import InputComponent from "../input";
import Router from "../../tools/Router";
import AuthAPI from "../../api/authAPI";
import UserAPI  from "../../api/userAPI";

interface UserProfile {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name?: string;
  phone: string;
  avatar?: string;
}

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

export default class ProfileInfoChangeComponent extends Block {
  modal: ModalComponent;
  authAPI: AuthAPI;
  router: Router;
  profilePhoto: ProfilePhotoComponent;
  // userAPI: UserAPI;

  constructor(props: ProfileChangePageProps) {
    const modal = new ModalComponent({
      onApply: () => console.log("File applied"),
    });

    const profilePhoto = new ProfilePhotoComponent({
      avatar: props.photoUrl,
      onClick: () => modal.show(),
    });

    super({
      ...props,
      modal,
      profilePhoto,
      emailInput: new InputComponent({
        type: 'email',
        className: 'profile-info__input',
        value: props.email || '',
        placeholder: 'Введите ваш имейл',
        onChange: (value) => this.onInputChange('email', value),
      }),
      loginInput: new InputComponent({
        type: 'text',
        className: 'profile-info__input',
        value: props.loginName || '',
        placeholder: 'Введите ваш логин',
        onChange: (value) => this.onInputChange('loginName', value),
      }),
      firstNameInput: new InputComponent({
        type: 'text',
        className: 'profile-info__input',
        value: props.firstName || '',
        placeholder: 'Введите ваше имя',
        onChange: (value) => this.onInputChange('firstName', value),
      }),
      secondNameInput: new InputComponent({
        type: 'text',
        className: 'profile-info__input',
        value: props.secondName || '',
        placeholder: 'Введите вашу фамилию',
        onChange: (value) => this.onInputChange('secondName', value),
      }),
      chatNameInput: new InputComponent({
        type: 'text',
        className: 'profile-info__input',
        value: props.chatName || '',
        placeholder: 'Введите ваше имя в чате',
        onChange: (value) => this.onInputChange('chatName', value),
      }),
      phoneInput: new InputComponent({
        type: 'text',
        className: 'profile-info__input',
        value: props.phone || '',
        placeholder: 'Введите ваш номер телефона',
        onChange: (value) => this.onInputChange('phone', value),
      }),
    });
    this.modal = modal;
    this.authAPI = new AuthAPI();
    // this.userAPI = new UserAPI();
      // @ts-expect-error null
    this.router = new Router();
    this.profilePhoto = profilePhoto;
    this.loadUserProfile();
  }

  onInputChange(field: string, value: string) {
    if (this.validateInput(field, value)) {
      this.setProps({ [field]: value });
    }}

  validateInput(field: string, value: string): boolean {
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return /^\d{1}-\d{1}-\d{1}-\d{1}-\d{1}-\d{1}$/.test(value);
      default:
        return true;
    }}

    updatePhoto() {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      console.log("🚀 ~ ProfileInfoChangeComponent ~ updatePhoto ~ user:", user)
      this.profilePhoto.setProps({ avatar: user.avatar });
    }

  async loadUserProfile() {
    try {
      const user = await this.authAPI.getUser();
      this.setProps({
        email: user.email,
        loginName: user.login,
        firstName: user.first_name,
        secondName: user.second_name,
        chatName: user.display_name || '',
        phone: user.phone,
        photoUrl: user.avatar || user.photoUrl
      });
    } catch (error) {
      console.error('Ошибка при загрузке профиля:', error);
    }
  }

  async handleSaveClick(event: Event) {
    event.preventDefault();

    const data: Partial<UserProfile> = {
      email: this.props.email as string,
      login: this.props.loginName as string,
      first_name: this.props.firstName as string,
      second_name: this.props.secondName as string,
      display_name: this.props.chatName as string,
      phone: this.props.phone as string,
    };

    try {
      const updatedUser: any = await UserAPI.updateProfile(data as any);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));

      this.setProps({
        email: updatedUser.email,
        loginName: updatedUser.login,
        firstName: updatedUser.first_name,
        secondName: updatedUser.second_name,
        chatName: updatedUser.display_name,
        phone: updatedUser.phone,
      });
      this.router.go('/profile');
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
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
