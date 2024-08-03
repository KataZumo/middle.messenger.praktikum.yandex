// import Block from "../tools/Block";
// import { isEqual } from "./isEqual";

// export function connect(Component: typeof Block, mapStateToProps: (state: any) => any) {
//     return class extends Component {
//         constructor(props: any) {
//             let state = mapStateToProps(store.getState());
//             super({ ...props, ...state });

//             store.subscribe(() => {
//                 const newState = mapStateToProps(store.getState());

//                 if (!isEqual(state, newState)) {
//                     this.setProps({ ...newState });
//                 }
//                 state = newState;
//             });
//         }
//     };
// }


import Block from "../tools/Block";
import { isEqual } from "../utils/isEqual";
import store from "./Store";


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
