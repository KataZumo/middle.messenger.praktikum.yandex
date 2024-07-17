import Block from "../../tools/Block";
import "./password-info.scss";

interface PasswordInfoProps {
  oldPassword: string;
  password: string;
  repitPassword: string;
}

export default class PasswordInfoComponent extends Block {
  constructor(props: PasswordInfoProps) {
    super({...props});
  }

  render() {
    return `<div class="profile-info">
  <div class="profile-info__item">
    <span class="profile-info__label">Старый пароль:</span>
    <span class="profile-info__value">{{oldPassword}}</span>
  </div>
  <div class="profile-info__item">
    <span class="profile-info__label">Новый пароль:</span>
    <span class="profile-info__value">{{password}}</span>
  </div>
  <div class="profile-info__item">
    <span class="profile-info__label">Повторите новый пароль:</span>
    <span class="profile-info__value">{{repitPassword}}</span>
  </div>
</div>
`;
  }
}
