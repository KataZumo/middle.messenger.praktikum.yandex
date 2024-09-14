import Block from "../../tools/Block";
import "./modal.scss";
import UserAPI from "../../api/userApi"

interface ModalComponentProps {
  events?: {
    click?: (event: Event) => void;
  };
  onApply?: () => void; // Коллбек для действия "Применить"
  [key: string]: unknown;
}

export default class ModalComponent extends Block {
  private statusMessage: HTMLElement;
  private previewImage: HTMLImageElement; // Элемент для предварительного просмотра изображения

  constructor(props: ModalComponentProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => this.handleClick(event),
      },
    });

    this.statusMessage = document.createElement('p');
    this.statusMessage.className = 'modal__status-message';

    this.previewImage = document.createElement('img'); // Создаем элемент для предварительного просмотра
    this.previewImage.className = 'modal__preview-image';
    this.previewImage.style.display = 'none'; // Скрываем, пока не выбран файл

    console.log('ModalComponent initialized'); // Лог инициализации компонента
  }

  handleClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('modal__close-button')) {
      console.log('Close button clicked'); // Лог клика по кнопке закрытия
      this.hide();
    } else if (target.classList.contains('modal__apply-button')) {
      console.log('Apply button clicked'); // Лог клика по кнопке "Применить"
      this.handleApplyClick(); // Обработчик нажатия кнопки "Применить"
    }
  }

  async handleApplyClick() {
    console.log('handleApplyClick called'); // Лог вызова метода handleApplyClick
  
    const fileInputElement = this.element.querySelector('#file-input') as HTMLInputElement;
    if (!fileInputElement) {
      console.error('File input element not found');
      return;
    }
  
    if (fileInputElement.files && fileInputElement.files[0]) {
      const file = fileInputElement.files[0];
      const formData = new FormData();
      formData.append('avatar', file); // Важно использовать ключ 'avatar' согласно Swagger
  
      console.log('Sending FormData to server:', formData); // Лог перед отправкой
  
      try {
        // Отправляем запрос на изменение аватарки через API
        const updatedUser = await UserAPI.changeAvatar(formData); // Передаем formData напрямую
        console.log('Аватарка успешно обновлена', updatedUser); // Лог успешного обновления
  
        // Обновляем avatar в sessionStorage
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        user.avatar = updatedUser.avatar; // Обновляем путь к новой аватарке
        sessionStorage.setItem('user', JSON.stringify(user));
        console.log('sessionStorage updated:', user); // Лог обновленного sessionStorage
  
        // Обновляем компонент новой аватаркой
        const newAvatarUrl = `https://ya-praktikum.tech/api/v2/resources${updatedUser.avatar}`; // Используем правильный путь с базовым URL
        this.showStatusMessage('Аватарка успешно обновлена!');
  
        if (this.props.onApply) {
          console.log('onApply callback called'); // Лог вызова коллбека onApply
          this.props.onApply(); // Вызов callback, чтобы обновить внешний компонент
        }
  
        this.hide();
      } catch (error: any) {
        console.error('Ошибка при загрузке аватарки:', error.message); // Лог ошибки при загрузке
        this.showStatusMessage('Ошибка при загрузке аватарки.');
      }
    } else {
      console.log('No file selected'); // Лог, если файл не выбран
      this.showStatusMessage('Пожалуйста, выберите файл');
    }
  }
  

  updateUserProfile(updatedUser: any) {
    console.log('Аватарка успешно обновлена', updatedUser); // Лог успешного обновления

    // Обновляем avatar в sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    user.avatar = updatedUser.avatar; // Обновляем путь к новой аватарке
    sessionStorage.setItem('user', JSON.stringify(user));
    console.log('sessionStorage updated:', user); // Лог обновленного sessionStorage

    // Обновляем компонент новой аватаркой
    const newAvatarUrl = `https://ya-praktikum.tech/api/v2/resources${updatedUser.avatar}`; // Используем правильный путь с базовым URL
    this.showStatusMessage('Аватарка успешно обновлена!');

    if (this.props.onApply) {
      console.log('onApply callback called'); // Лог вызова коллбека onApply
      this.props.onApply(); // Вызов callback, чтобы обновить внешний компонент
    }

    this.hide();
  }

  showStatusMessage(message: string) {
    const statusMessageElement = this.element.querySelector('#status-message') as HTMLElement;
    statusMessageElement.textContent = message;
    console.log('Status message shown:', message); // Лог отображаемого сообщения о статусе
  }

  handleFileSelection(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Создаем временный URL для предварительного просмотра
      this.previewImage.src = imageUrl; // Обновляем атрибут src для предварительного просмотра
      this.previewImage.style.display = 'block'; // Показываем изображение
      console.log('Preview image updated:', imageUrl); // Лог обновления превью
    }
  }

  override render() {
    // После рендеринга назначаем обработчик события для выбора файла
    setTimeout(() => {
      const fileInput = this.element.querySelector('#file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.addEventListener('change', this.handleFileSelection.bind(this)); // Привязываем контекст
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
    console.log('Modal shown'); // Лог открытия модального окна
    this.element.style.display = 'block';
  }

  hide() {
    console.log('Modal hidden'); // Лог закрытия модального окна
    this.element.style.display = 'none';
  }
}






