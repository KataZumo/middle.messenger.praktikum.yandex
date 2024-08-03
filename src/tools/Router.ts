import Route from "./Route";

interface IRoute {
    pathname: string;
    block: any; // Лучше уточнить тип блока
    options: { rootQuery: string };
    match(pathname: string): boolean;
    leave(): void;
    render(route: IRoute, pathname: string): void;
}

class Router {
    private static __instance: Router;
    private routes: any;
    private history: any;
    private _currentRoute: any;
    private _rootQuery: any;
    private _historyIndex: number | undefined;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._historyIndex = 0
        Router.__instance = this;
    }

    use(pathname: string, block: any): any {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = () => {
            this._onRoute(document.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const route: IRoute | undefined = this.getRoute(pathname);
        // console.log("🚀 ~ Router ~ _onRoute ~ route:", route)
        if (!route) {
            this.handleNotFound(); // Обработка 404
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._historyIndex!++;
        this._onRoute(pathname);
    }

    back() {
        if (this._historyIndex! > 0) {
          this._historyIndex!--;
          this.history?.back();
        }
      }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): IRoute | undefined {
        return this.routes.find(route => route.match(pathname));
    }

    private handleNotFound(): void {
        console.error('Route not found:', window.location.pathname);
        
    }
}

export default Router;
 