type State = {
    [key: string]: any;
};

type Listener = () => void;

class Store {
    private state: State;
    private listeners: Listener[];

    constructor(initialState: State = {}) {
        this.state = initialState;
        this.listeners = [];
    }

    getState(): State {
        return this.state;
    }

    setState(newState: Partial<State>): void {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    subscribe(listener: Listener): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notify(): void {
        this.listeners.forEach(listener => listener());
    }
}

const store = new Store({
    // начальное состояние, если необходимо
});

export default store;
