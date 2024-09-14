import ProfileInfoComponent from "../../components/profile-info";
import Block from "../../tools/Block";
import "./profile-page.scss";

interface ProfilePageProps {
  name?: string;
  email?: string;
  loginName?: string;
  firstName?: string;
  secondName?: string;
  chatName?: string;
  phone?: string;
  photoUrl?: string;
  [key: string]: any;
}

export default class ProfilePage extends Block {
  constructor(props: ProfilePageProps = {}) {
    // Используем статический метод для получения данных пользователя
    const user = ProfilePage.getUserDataFromSession();

    super({
      ...props,
      profile: new ProfileInfoComponent({
        name: user.first_name,
        email: user.email,
        loginName: user.login,
        firstName: user.first_name,
        secondName: user.second_name,
        chatName: user.display_name || user.login, // Используем display_name или login в качестве chatName
        phone: user.phone,
        photoUrl: user.avatar, 
      }),
    });
  }

  // Статический метод для получения данных пользователя из sessionStorage
  static getUserDataFromSession() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : {}; // Возвращает объект или пустой объект, если нет данных
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

