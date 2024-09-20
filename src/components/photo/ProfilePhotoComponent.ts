import Block from "../../tools/Block";

interface ProfilePhotoProps {
  onClick: () => void;
  avatar?: string;
}

export default class ProfilePhotoComponent extends Block {
  constructor(props: ProfilePhotoProps) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const userAvatar = user.avatar || `https://habrastorage.org/webt/5b/a7/42/5ba7425c10ae1768628810.jpeg`
    const avatarUrl = `https://ya-praktikum.tech/api/v2/resources/${userAvatar}`;
    
    console.log("ProfilePhotoComponent: текущая аватарка пользователя:", userAvatar); 
    super({
      ...props,
      avatar: avatarUrl,
      events: {
        click: () => {
          console.log("ProfilePhotoComponent: клик по аватарке");
          props.onClick();
        },
      },
    });
  }

  updateAvatar(newAvatar: string) {
    console.log("ProfilePhotoComponent: обновление аватарки на:", newAvatar); 
    this.setProps({ avatar: newAvatar });
  }

  override render() {
    return `<div class="profile-photo" onclick="{{events.click}}">
        <img src="{{avatar}}" alt="Profile Photo" class="profile-photo__image" />
      </div>`;
  }
}

