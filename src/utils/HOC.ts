import Block from "../tools/Block";
import { isEqual } from "../utils/isEqual";
import {store} from "../tools/Store";


export function connect(Component: typeof Block, mapStateToProps: (state: any) => any) {
    return class extends Component {
        private unsubscribe: () => void;

        constructor(props: any) {
            let state = mapStateToProps(store.getState());
            super({ ...props, ...state });

            this.unsubscribe = store.subscribe(() => {
                const newState = mapStateToProps(store.getState());

                if (!isEqual(state, newState)) {
                    this.setProps({ ...newState });
                }
                state = newState;
            });
        }

        componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
        }
    };
}

// utils/getUserData.ts
export interface UserData {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    avatar: string | null;
    email: string;
    phone: string;
}

export function getUserData(): UserData | null {
    const userDataString = sessionStorage.getItem('user');
    if (userDataString) {
        try {
            const userData: UserData = JSON.parse(userDataString);
            return userData;
        } catch (error) {
            console.error('Ошибка при парсинге данных пользователя из sessionStorage:', error);
            return null;
        }
    }
    return null;
}

