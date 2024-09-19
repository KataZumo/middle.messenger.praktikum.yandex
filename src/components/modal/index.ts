import UserAPI from "../../api/userApi";
import Block from "../../tools/Block";
import "./modal.scss";
// import UserAPI from "../../api/userApi"

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
  userAPI: UserAPI | undefined;

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
    this.userAPI = new UserAPI();
  }

  handleClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('modal__close-button')) {
      this.hide();
    }
  }

  async handleApplyClick() {
    const fileInputElement = this.element?.querySelector('#file-input') as HTMLInputElement;
    if (!fileInputElement || !fileInputElement.files || !fileInputElement.files[0]) {
      this.showStatusMessage('Пожалуйста, выберите файл');
      console.log("ModalComponent: файл не выбран или input не найден");
      return;
    }

    const file = fileInputElement.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    console.log("ModalComponent: выбранный файл:", file);

    try {
      console.log("ModalComponent: отправка запроса на изменение аватарки...");
      const updatedUser = await this.userAPI?.changeAvatar(formData);

      console.log("ModalComponent: ответ от API:", updatedUser);

      if (updatedUser) {
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        console.log("ModalComponent: обновленный пользователь сохранен в sessionStorage:", updatedUser);
        this.showStatusMessage('Аватарка успешно обновлена!');
        
        if (this.props.onApply) {
          // @ts-expect-error null
          this.props.onApply();  
        }

        this.hide();
      }
    } catch (error) {
      console.error("ModalComponent: ошибка при загрузке аватарки:", error);
      this.showStatusMessage('Ошибка при загрузке аватарки.');
    }
  }

  handleFileSelection(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.previewImage.src = imageUrl;
      this.previewImage.style.display = 'block';
    }
  }

  showStatusMessage(message: string) {
    const statusMessageElement = this.element?.querySelector('#status-message') as HTMLElement;
    if (statusMessageElement) {
      statusMessageElement.textContent = message;
    }
  }

  override render() {
    return `<div class="modal" style="display: none;">
      <div class="modal__content">
        <span class="modal__close-button">&times;</span>
        <h2 class="modal__title">Загрузить файл</h2>
        <label class="modal__label" for="file-input" id="file-label">Выбрать файл на компьютере</label>
        <input type="file" id="file-input" class="modal__input">
        <img class="modal__preview-image" src="" style="display: none;" />
        <button class="modal__apply-button">Применить</button>
        <p class="modal__status-message" id="status-message"></p>
      </div>
    </div>`;
  }

  override componentDidMount() {
    const fileInput = this.element?.querySelector('#file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.addEventListener('change', this.handleFileSelection.bind(this));
    }

    const applyButton = this.element?.querySelector('.modal__apply-button') as HTMLButtonElement;
    if (applyButton) {
      applyButton.addEventListener('click', this.handleApplyClick.bind(this));
    }
  }

  show() {
    if (this.element) {
      this.element.style.display = 'block';
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }
}


