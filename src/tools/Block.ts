import Handlebars from "handlebars";
import EventBus from "./EventBus";

export interface IProps {
  __id?: string;
  events?: { [key: string]: (e: Event) => void };
  lists?: { [key: string]: unknown[] }; // Исправлено
  attr?: { [key: string]: string };
  [key: string]: unknown;
}

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_CDUM: "flow:component-did-unmount",
  } as const;

  private _element: HTMLElement | null = null;
  private _id: number = Math.floor(100000 + Math.random() * 900000);
  props: IProps;
  children: { [key: string]: Block };
  lists: { [key: string]: unknown[] }; 
  private eventBus: () => EventBus<typeof Block.EVENTS[keyof typeof Block.EVENTS]>;

  constructor(propsWithChildren: IProps = {}) {
    const eventBus = new EventBus<typeof Block.EVENTS[keyof typeof Block.EVENTS]>();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;
    Object.entries(events).forEach(([eventName, eventListener]) => {
      if (this._element) {
        this._element.removeEventListener(eventName, eventListener);
      }
    });
  }

  private _registerEvents(eventBus: EventBus<typeof Block.EVENTS[keyof typeof Block.EVENTS]>): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDUM, this._componentDidUnmount.bind(this));
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

  private _componentDidUnmount(): void {
    this.componentDidUnmount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidUnmount();
    });
  }

  protected componentDidUnmount() {}

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  dispatchComponentDidUnmount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDUM);
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
    lists: { [key: string]: unknown[] };
  } {
    const children: { [key: string]: Block } = {};
    const props: IProps = {};
    const lists: { [key: string]: unknown[] } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value; // Исправлено
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
    const propsAndStubs = { ...this.props };
    
    // Добавляем заглушки для детей
    Object.entries(this.children).forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    // Добавляем заглушки для списков
    Object.entries(this.lists).forEach(([key, list]) => {
        propsAndStubs[key] = list.map((item: unknown, index: number) => {
            if (item instanceof Block) {
                return `<div data-id="__l_${index}"></div>`;
            }
            return item;
        }).join('');
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    // Вставляем дочерние компоненты
    Object.values(this.children).forEach((child) => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if (stub) {
            const content = child.getContent();
            if (content) {
                stub.replaceWith(content);
            }
        }
    });

    // Вставляем компоненты из списков
    Object.entries(this.lists).forEach(([key, list]) => {
      console.log(key);
      
        list.forEach((item, index) => {
            if (item instanceof Block) {
                const stub = fragment.content.querySelector(`[data-id="__l_${index}"]`);
                if (stub) {
                    const content = item.getContent();
                    if (content) {
                        stub.replaceWith(content);
                    }
                }
            }
        });
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;

    if (this._element && newElement) {
        this._removeEvents();
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
