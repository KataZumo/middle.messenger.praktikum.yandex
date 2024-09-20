import  UserAPI  from "../../api/userApi";
import Block from "../../tools/Block";
import "./modal.scss";


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
  private avatarUrl: string | null = null;
  // userAPI: UserAPI;

  constructor(props: ModalComponentProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => (console.log('это любой клик'), this.handleClick(event)),
      },
    });

    this.statusMessage = document.createElement('p');
    this.statusMessage.className = 'modal__status-message';
    this.previewImage = document.createElement('img');
    this.previewImage.className = 'modal__preview-image';
    this.previewImage.style.display = 'none';
    // this.userAPI = new UserAPI();
  }

  handleClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal__close-button')) {
      this.hide();
    }
  }

  async handleApplyClick() {
    const fileInputElement = document.querySelector('#file-input') as HTMLInputElement;
    if (!fileInputElement || !fileInputElement.files || !fileInputElement.files[0]) {
      this.showStatusMessage('Пожалуйста, выберите файл');
    }
    //@ts-expect-error null
    const file = fileInputElement.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const updatedUser = await UserAPI.changeAvatar(formData);
      if (updatedUser) {
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        this.showStatusMessage('Аватарка успешно обновлена!');
        this.avatarUrl = updatedUser.avatar;
        this.updatePreviewImage(); 
        if (this.props.onApply) {
    //@ts-expect-error null
          this.props.onApply();  
        }
        this.hide();
      }
    } catch (error) {
      console.error("ModalComponent: ошибка при загрузке аватарки:", error);
      this.showStatusMessage('Ошибка при загрузке аватарки.');
    }
    return;

  }

  handleFileSelection(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.avatarUrl = imageUrl; 
      this.updatePreviewImage(); 
    }
  }

  updatePreviewImage() {
    if (this.avatarUrl) {
      this.previewImage.src = this.avatarUrl;
      this.previewImage.style.display = 'block';
    }
  }

  showStatusMessage(message: string) {
    const statusMessageElement = this.element?.querySelector('#status-message') as HTMLElement;
    if (statusMessageElement) {
      statusMessageElement.textContent = message;
    }
  }

  show() {
    if (this.element) {
      this.element.style.display = 'block';
      this.initEventListeners();
    }
  }

  initEventListeners() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.addEventListener('change', this.handleFileSelection.bind(this));
    }

    const applyButton = document.querySelector('.modal__apply-button') as HTMLButtonElement;
    if (applyButton) {
      applyButton.addEventListener('click', this.handleApplyClick.bind(this));
    }
  }

  removeEventListeners() {
    const fileInput = document.querySelector('#file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.removeEventListener('change', this.handleFileSelection.bind(this));
    }

    const applyButton = document.querySelector('.modal__apply-button') as HTMLButtonElement;
    if (applyButton) {
      applyButton.removeEventListener('click', this.handleApplyClick.bind(this));
    }
  }

render() {
    return `
      <div class="modal" style="display: none;">
        <div class="modal__content">
          <span class="modal__close-button">&times;</span>
          <h2 class="modal__title">Загрузить файл</h2>
          <label class="modal__label" for="file-input" id="file-label">Выбрать файл на компьютере</label>
          <input type="file" id="file-input" class="modal__input">
          <div class="avatar-container" style="width: 30px; height: 30px; overflow: hidden;">
            <img class="modal__preview-image" src="${this.avatarUrl || ''}" style="width: 100%; height: auto; display: ${this.avatarUrl ? 'block' : 'none'};" />
          </div>
          <button class="modal__apply-button">Применить</button>
          <p class="modal__status-message" id="status-message"></p>
        </div>
      </div>
    `;
  }
}
