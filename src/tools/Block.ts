import Handlebars from "handlebars";
import EventBus from "./EventBus";

interface IProps {
  __id?: string;
  events?: { [key: string]: (e: Event) => void };
  lists?: Block[];
  attr?: { [key: string]: string };
  [key: string]: unknown;
}

abstract class Block<Props extends IProps = IProps> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_CDUM: "flow:component-did-unmount",
  };

  private _element: HTMLElement | null = null;
  private _id: number = Math.floor(100000 + Math.random() * 900000);
  props: Props;
  children: { [key: string]: Block<any> };
  lists: { [key: string]: unknown[] };
  private eventBus: () => EventBus;

  constructor(propsWithChildren: Props = {} as Props) {
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
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;
    Object.entries(events).forEach(([eventName, eventListener]) => {
      if (this._element) {
        this._element.removeEventListener(eventName, eventListener);
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
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

  protected componentDidUnmount(): void {}

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

  private _getChildrenPropsAndProps(propsAndChildren: Props): {
    children: { [key: string]: Block<any> };
    props: Props;
    lists: { [key: string]: unknown[] };
  } {
    const children: { [key: string]: Block<any> } = {};
    const props: Partial<Props> = {};
    const lists: { [key: string]: unknown[] } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        (props as any)[key] = value;
      }
    });

    return { children, props: props as Props, lists };
  }

  private addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element && typeof value === "string") {
        this._element.setAttribute(key, value);
      }
    });
  }

  setProps = (nextProps: Partial<Props>): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs: { [key: string]: any } = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        const content = child.getContent();
        if (content) {
          stub.replaceWith(content);
        }
      }
    });

    Object.entries(this.lists).forEach(([list]) => {
      const listCont = this._createDocumentElement("template") as HTMLTemplateElement;
      (list as unknown as unknown[]).forEach((item) => {
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
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement as HTMLElement;
    this._addEvents();
    this.addAttributes();
  }

  abstract render(): string;

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: Props): Props {
    const self = this;
  
    return new Proxy(props as Record<string, any>, { 
      get(target: Record<string, any>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string, any>, prop: string, value: unknown) {
        const oldTarget = { ...target }; 
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("No access");
      },
    }) as Props;
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

export default Block
