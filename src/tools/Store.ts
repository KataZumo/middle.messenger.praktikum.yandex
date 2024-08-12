interface ProfileState {
  email: string;
  loginName: string;
  firstName: string;
  secondName: string;
  chatName: string;
  phone: string;
  photoUrl: string;
}

interface AppState {
  profile: ProfileState;
}

class Store {
  private state: AppState;
  private listeners: Function[] = [];

  constructor(initialState: AppState) {
    this.state = initialState;
  }

  getState(): AppState {
    return this.state;
  }

  setState(newState: Partial<AppState>): void {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.notify();
  }

  updateProfile(profile: Partial<ProfileState>): void {
    this.setState({
      profile: {
        ...this.state.profile,
        ...profile,
      },
    });
  }

  subscribe(listener: Function): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Function): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}

const initialState: AppState = {
  profile: {
    email: '',
    loginName: '',
    firstName: '',
    secondName: '',
    chatName: '',
    phone: '',
    photoUrl: '',
  },
};

export const store = new Store(initialState);

export function getState(): AppState {
  return store.getState();
}
