import LinkComponent from "../../components/link";
import ProfileInfoComponent from "../../components/profile-info";
import Block from "../../tools/Block";
import Router from "../../tools/Router";
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
  private router: Router;

  constructor(props: ProfilePageProps = {}) {
    const user = ProfilePage.getUserDataFromSession();

    super({
      ...props,
      profile: new ProfileInfoComponent({
        name: user.first_name,
        email: user.email,
        loginName: user.login,
        firstName: user.first_name,
        secondName: user.second_name,
        chatName: user.login,
        phone: user.phone,
        photoUrl: user.avatar, 
      }),
      Link: new LinkComponent({ href: '/chat', text: 'Назад', className: 'profile-page__nav-btn' }),
    });
    //@ts-expect-error null
    this.router = new Router();
  }

  static getUserDataFromSession() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : {}; 
  }

  componentDidMount() {
    const backButton = this.element?.querySelector('.profile-page__nav-btn');
    if (backButton) {
      backButton.addEventListener('click', this.handleBackClick);
    }
  }

  componentWillUnmount() {
    const backButton = this.element?.querySelector('.profile-page__nav-btn');
    if (backButton) {
      backButton.removeEventListener('click', this.handleBackClick);
    }
  }

  handleBackClick = (event: Event) => {
    event.preventDefault();
    this.router.go('/chat');
  };

  override render() {
    return `<div class="profile-page">
      <div class="profile-page__content">
        {{{profile}}}
      </div>
      <div class="profile-page__left">
        {{{Link}}}
        </div>
      </div>`;
      }
    }
