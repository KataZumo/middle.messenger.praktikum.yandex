import Handlebars from "handlebars";
import EventBus from "./EventBus";

export interface IProps {
  __id?: string;
  events?: { [key: string]: (e: Event) => void };
  lists?: Block[];
  attr?: { [key: string]: string }; // Добавлена типизация для атрибутов
  [key: string]: unknown;
}

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;

  private _id: number = Math.floor(100000 + Math.random() * 900000);

  props: IProps;

  children: { [key: string]: Block };

  lists: { [key: string]: unknown[] };

  private eventBus: () => EventBus;

  constructor(propsWithChildren: IProps = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } =
      this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    console.log(events);
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(): void {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(): boolean {
    return true;
  }

  private _getChildrenPropsAndProps(propsAndChildren: IProps): {
    children: { [key: string]: Block };
    props: IProps;
    lists: { [key: string]: any[] };
  } {
    const children: { [key: string]: Block } = {};
    const props: IProps = {};
    const lists: { [key: string]: any[] } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  private addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element && typeof value === 'string') {
        this._element.setAttribute(key, value);
      }
    });
  }

  setProps = (nextProps: Partial<IProps>): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    console.log("Render");
    const propsAndStubs = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, list]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement(
      "template",
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    // Comment if you want to see
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        const content = child.getContent();
        if (content) {
          stub.replaceWith(content);
        }
      }
    });

    Object.entries(this.lists).forEach(([key, list]) => {
      const listCont = this._createDocumentElement(
        "template",
      ) as HTMLTemplateElement;
      list.forEach((item) => {
        if (item instanceof Block) {
          const content = item.getContent();
          if (content) {
            listCont.content.append(content);
          }
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  render(): string {
    return "";
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: IProps): IProps {
    const self = this;

    return new Proxy(props, {
      get(target: IProps, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: IProps, prop: string, value: unknown) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("No access");
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    if (this.element) {
      this.element.style.display = "block";
    }
  }

  hide(): void {
    if (this.element) {
      this.element.style.display = "none";
    }
  }
}
