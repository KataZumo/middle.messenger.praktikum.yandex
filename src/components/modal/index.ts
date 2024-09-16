import Block from "../../tools/Block";
import "./modal.scss";
import UserAPI from "../../api/userApi"

interface ModalComponentProps {
  events?: {
    click?: (event: Event) => void;
  };
  onApply?: () => void; 
  [key: string]: unknown;
}

export default class ModalComponent extends Block {
  private statusMessage: HTMLElement;
  private previewImage: HTMLImageElement; 
  constructor(props: ModalComponentProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => this.handleClick(event),
      },
      
    });

    this.statusMessage = document.createElement('p');
    this.statusMessage.className = 'modal__status-message';

    this.previewImage = document.createElement('img'); 
    this.previewImage.className = 'modal__preview-image';
    this.previewImage.style.display = 'none';
  }

  handleClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('modal__close-button')) {
      this.hide();
      this.handleApplyClick(); 
    }
  }

  async handleApplyClick() {
    const fileInputElement = this.element?.querySelector('#file-input') as HTMLInputElement;
    if (!fileInputElement) {
      return;
    }
  
    if (fileInputElement.files && fileInputElement.files[0]) {
      const file = fileInputElement.files[0];
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        const updatedUser = await UserAPI.changeAvatar(formData);
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        //@ts-expect-error null
        user.avatar = updatedUser.avatar; 
        sessionStorage.setItem('user', JSON.stringify(user));
        this.showStatusMessage('Аватарка успешно обновлена!');
  
        if (this.props.onApply) {
          //@ts-expect-error null
          this.props.onApply(); 
        }
        this.hide();
      } catch (error: any) {
        this.showStatusMessage('Ошибка при загрузке аватарки.');
      }
    } else {
      this.showStatusMessage('Пожалуйста, выберите файл');
    }
  }

  updateUserProfile(updatedUser: any) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    user.avatar = updatedUser.avatar; 
    sessionStorage.setItem('user', JSON.stringify(user));
    this.showStatusMessage('Аватарка успешно обновлена!');
    if (this.props.onApply) {
          //@ts-expect-error null
      this.props.onApply(); 
    }
    this.hide();
  }
  showStatusMessage(message: string) {
    const statusMessageElement = this.element?.querySelector('#status-message') as HTMLElement;
    statusMessageElement.textContent = message;
  }

  handleFileSelection(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      this.previewImage.src = imageUrl;
      this.previewImage.style.display = 'block'; 
    }
  }

  override render() {
    setTimeout(() => {
      const fileInput = this.element?.querySelector('#file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.addEventListener('change', this.handleFileSelection.bind(this)); 
      }
    }, 0);

    return `<div class="modal" style="display: none;">
      <div class="modal__content">
        <span class="modal__close-button">&times;</span>
        <h2 class="modal__title">Загрузить файл</h2>
        <label class="modal__label" for="file-input" id="file-label">Выбрать файл на компьютере</label>
        <input type="file" id="file-input" class="modal__input">
        <img class="modal__preview-image" src="" style="display: none;" /> <!-- Превью изображения -->
        <button class="modal__apply-button">Применить</button>
        <p class="modal__status-message" id="status-message"></p>
      </div>
    </div>`;
  }

  show() {
    //@ts-expect-error null
    this.element.style.display = 'block';
  }

  hide() {
    //@ts-expect-error null
    this.element.style.display = 'none';
  }
}






