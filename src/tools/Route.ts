import { isEqual } from "../utils/isEqual";
import { render } from "../utils/render";
import { getState } from "./Store";

interface RouteProps {
    rootQuery: string;
}

class Route {
    private _pathname: string;
    private _blockClass: any;
    private _block: any;
    private _props: RouteProps;

    constructor(pathname: string, view: any, props: RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
        if (!this._block) {
            if (typeof this._blockClass !== 'function') {
                throw new Error(`Block class for ${this._pathname} is not a constructor`);
            }
            const state = getState(); // Получаем состояние из store
            this._block = new this._blockClass(state.profile); // Передаем state.profile в конструктор
            render(this._props.rootQuery, this._block);
        } else {
            this._block.show();
        }
    }
}

export default Route;
