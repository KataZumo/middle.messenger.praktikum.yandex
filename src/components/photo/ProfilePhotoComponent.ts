import Block from "../../tools/Block";

interface ProfilePhotoProps {
  onClick: () => void;
  avatar?: string;
}

export default class ProfilePhotoComponent extends Block {
  constructor(props: ProfilePhotoProps) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const userAvatar = user.avatar || props.avatar;
    
    console.log("ProfilePhotoComponent: текущая аватарка пользователя:", userAvatar); 
    super({
      ...props,
      avatar: userAvatar,
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

