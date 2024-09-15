import { getUserData } from "../utils/HOC";

class ChatWebSocket {
    private socket: WebSocket | null = null;
    private userId: number;
    private chatId: number;
    private token: string;
    private handlers: { [key: string]: Function[] } = {};
    private isConnected: boolean = false;
    private messageQueue: string[] = [];

    constructor(userId: number, chatId: number, token: string) {
        this.userId = userId;
        this.chatId = chatId;
        this.token = token;
        this.connect();
    }

    private connect() {
        const wsUrl = `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`;
        console.log(`Подключение к WebSocket по адресу: ${wsUrl}`);
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            console.log('WebSocket соединение открыто');
            this.isConnected = true;
            this.messageQueue.forEach(message => this.sendMessage(message));
            this.messageQueue = [];
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
            console.log('Parsed WebSocket сообщение:', data);
            this.handleMessage(data);
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket соединение закрыто', event);
            this.isConnected = false;
            setTimeout(() => {
                console.log('Попытка переподключения к WebSocket...');
                this.connect();
            }, 5000);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket ошибка:', error);
        };
    }

    private handleMessage(data: any) {
        const { type } = data;
        if (this.handlers[type]) {
            this.handlers[type].forEach(handler => handler(data));
        }
    }

    public on(type: string, handler: Function) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    }

    public sendMessage(message: string) {
        if (this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'message',
                chatId: getUserData()?.id as number,
                content: message,
            }));
            console.log('Отправлено сообщение через WebSocket:', message);
        } else {
            console.warn('WebSocket не открыт. Сообщение добавлено в очередь.');
            this.messageQueue.push(message);
        }
    }

    public close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default ChatWebSocket;
