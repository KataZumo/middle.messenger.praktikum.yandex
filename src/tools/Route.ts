import { isEqual } from "../utils/isEqual";
import { render } from "../utils/render";

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
            this._block = new this._blockClass();
            console.log("🚀 ~ Route ~ render ~ _block:", this._blockClass)
            render(this._props.rootQuery, this._block);
        } else {
            this._block.show();
        }
    }
}

export default Route;
