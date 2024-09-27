class ChatWebSocket {
    private socket: WebSocket | null = null;
    private userId: number;
    private chatId: number;
    private token: string;
    private userName: string;
    private handlers: { [key: string]: any[] } = {};
    private isConnected: boolean = false;
    private messageQueue: string[] = [];

    constructor(userId: number, chatId: number, token: string, userName: string) {
        this.userId = userId;
        this.chatId = chatId;
        this.token = token;
        this.userName = userName;
        console.log('ChatWebSocket инициализирован:', { userId, chatId, token, userName });
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            const wsUrl = `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`;
            console.log(`Подключение к WebSocket по адресу: ${wsUrl}`);
            this.socket = new WebSocket(wsUrl);

            this.socket.onopen = () => {
                console.log('WebSocket соединение открыто');
                this.isConnected = true;
                this.messageQueue.forEach(message => this.sendMessage(message));
                this.messageQueue = [];
                resolve(); // Соединение установлено, резолвим промис
            };

            this.socket.onmessage = (event) => {
                console.log('Raw WebSocket сообщение:', event.data);
                let data;
                try {
                    data = JSON.parse(event.data);
                } catch (error) {
                    console.error('Получен некорректный JSON:', event.data);
                    return;
                }

                console.log('Обработанное сообщение:', data);

                if (data.type === 'message') {
                    console.log('Тип сообщения: message');
                    this.handleMessage(data);
                } else if (Array.isArray(data)) {
                    console.log('Тип сообщения: get old (массив сообщений)');
                    this.handleOldMessages(data);
                } else {
                    console.log('Неизвестный тип сообщения:', data);
                }
            };

            this.socket.onclose = (event) => {
                console.log('WebSocket соединение закрыто:', event);
                this.isConnected = false;
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket ошибка:', error);
                reject(error);
            };
        });
    }

    private handleMessage(data: any) {
        console.log('handleMessage вызван с данными:', data);
        if (this.handlers['message']) {
            console.log('Вызов зарегистрированных обработчиков для типа message');
            this.handlers['message'].forEach(handler => handler(data));
        } else {
            console.log('Обработчиков для типа message нет');
        }
    }

    private handleOldMessages(data: any[]) {
        console.log('handleOldMessages вызван с данными:', data);
        if (this.handlers['oldMessages']) {
            console.log('Вызов зарегистрированных обработчиков для типа oldMessages');
            this.handlers['oldMessages'].forEach(handler => handler(data));
        } else {
            console.log('Обработчиков для типа oldMessages нет');
        }
    }

    public on(type: string, handler: any) {
        console.log(`Регистрация обработчика для типа ${type}`);
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
        console.log(`Обработчик для типа ${type} зарегистрирован.`);
    }

    public getOldMessages(offset: number) {
        if (this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.log('Отправка запроса get old с offset:', offset);
            this.socket.send(JSON.stringify({
                type: 'get old',
                content: offset.toString(),
            }));
        } else {
            console.warn('WebSocket не открыт. Не могу запросить историю сообщений.');
        }
    }

    public sendMessage(message: string) {
        if (this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.log('Отправка сообщения через WebSocket:', message);
            this.socket.send(JSON.stringify({
                type: 'message',
                userId: this.userId,
                userName: this.userName,
                chatId: this.chatId,
                content: message,
            }));
        } else {
            console.warn('WebSocket не открыт. Сообщение добавлено в очередь.');
            this.messageQueue.push(message);
        }
    }

    public close() {
        console.log('Закрытие WebSocket соединения');
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default ChatWebSocket;
