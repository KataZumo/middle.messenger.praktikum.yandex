import Block from "../../tools/Block";

interface ProfilePhotoProps {
  onClick: () => void;
  avatar?: string;
}

export default class ProfilePhotoComponent extends Block {
  constructor(props: ProfilePhotoProps) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    // const userAvatar = user.avatar || `https://habrastorage.org/webt/5b/a7/42/5ba7425c10ae1768628810.jpeg`;
    // const userAvatar = user.avatar;
    const avatarUrl = `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`;
    
    super({
      ...props,
      avatar: avatarUrl,
      events: {
        click: () => props.onClick(),
      },
    });
  }

  updateAvatar(newAvatar: string) {
    this.setProps({ avatar: `https://ya-praktikum.tech/api/v2/resources/${newAvatar}` });
    sessionStorage.setItem('user', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('user') || '{}'), avatar: newAvatar }));
  }

  override render() {
    return `<div class="profile-photo">
        <img src="{{avatar}}" alt="Profile Photo" class="profile-photo__image" />
      </div>`;
  }
}

