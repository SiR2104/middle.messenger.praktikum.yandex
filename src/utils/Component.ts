import Uid from './Uid';
import EventBus from './EventBus';
import Template from './Template';
import Router from "./Router";
import uid from "./Uid";

export interface IProp {
  [key: string]: string | Function | number | null | undefined | object
}

interface IComponent {
  [key: string]: Component
}

interface IAction {
  [key: string]: Function
}

interface IActionContainer {
  [key: string]: IAction
}

enum EVENTS {
  COMPONENT_INIT = 'component:init',
  COMPONENT_MOUNT = 'component:mount',
  COMPONENT_UNMOUNT = 'component:unmount',
  COMPONENT_UPDATE = 'component:update',
  COMPONENT_RENDER = 'component:render'
}

export default class Component {
  private _eventBus: EventBus = new EventBus();

  private _element: HTMLElement;

  private _actions: IAction = {};

  private _assignedActions:IActionContainer = {};

  private readonly _id: string;

  private readonly _props: IProp = {};

  private readonly _components: IComponent = {};


  constructor(propsAndComponents?: IProp) {
    this._id = Uid.gen();
    const [components, props] = this._divideComponentsAndProps(propsAndComponents);
    if (components) this._components = components as IComponent;
    if (props) this._props = this._makeProxy({ ...props, _id: this._id });
    this._registerActions();
    this._registerEvents();
    this._eventBus.emit(EVENTS.COMPONENT_INIT);
  }

  private _divideComponentsAndProps(propsAndComponents: IProp | undefined): [IProp, IProp] {
    if (!propsAndComponents) return [{}, {}];
    const components: IProp = {};
    const props: IProp = {};
    Object.entries(propsAndComponents).forEach(([key, value]) => {
      if (value instanceof Component) {
        components[key] = value;
      }
      else {
        props[key] = value;
      }
    });
    return [components, props];
  }

  private _registerEvents(): void {
    this._eventBus.on(EVENTS.COMPONENT_INIT, this.init.bind(this));
    this._eventBus.on(EVENTS.COMPONENT_MOUNT, this._componentDidMount.bind(this));
    this._eventBus.on(EVENTS.COMPONENT_UNMOUNT, this._componentDidUnmount.bind(this));
    this._eventBus.on(EVENTS.COMPONENT_UPDATE, this._componentDidUpdate.bind(this));
    this._eventBus.on(EVENTS.COMPONENT_RENDER, this._render.bind(this));
  }

  private _registerActions(): void {
    this._actions = this.props.actions as IAction || {};
  }

  private _makeProxy(props: IProp): IProp {
    const self = this;
    return new Proxy<IProp>(props, {
      get(target: IProp, prop: string): IProp {
        if (prop.indexOf('_') === 0) {
          throw new Error('Param restricted');
        }
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: IProp, prop: string, value: IProp): boolean {
        if (prop.indexOf('_') === 0 || prop === 'meta') {
          throw new Error('Param restricted');
        }
        const oldProps = {...target};
        target[prop] = value;
        self._eventBus.emit(EVENTS.COMPONENT_UPDATE,oldProps as any, target as any);
        return true;
      },
      deleteProperty(target: IProp, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }
        delete target[prop];
        self._eventBus.emit(EVENTS.COMPONENT_UPDATE,{...target} as any, target as any);
        return true;
      },
    });
  }

  get props(): IProp {
    return this._props;
  }

  get components(): IComponent {
    return this._components;
  }

  setProps = (nextProps: IProp):void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this._props, nextProps);
  };

  private _addEvents(): void {
    const { events } = this._props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        const listener = events && events[eventName as keyof typeof events];
        if (listener) this._element.addEventListener(eventName, listener);
      });
    }
  }

  private _navigateRoute(e: Event): void
  {
    e.preventDefault();
    const href = (<HTMLElement>e.currentTarget).getAttribute('href');
    if (href)
    {
      if (!Router.navigate(href)) Router.navigate('/error/404');
    }
  }

  private _addCustomActions(): void {
    if (!this._element) return;
    const elements = this._element.querySelectorAll('*');
    const expActionName: RegExp = new RegExp(/on-([A-z0-9]+)?\W?/);
    const expActionValue: RegExp = new RegExp(/([A-z0-9]+)(?:\(([A-z0-9,]+?)?\))?/);
    const id = uid.gen();
    Object.values(elements).forEach(element => {
        const data: NamedNodeMap = element?.attributes;
        if (data)
        {
          Object.values(data).forEach(attribute => {
            const actionNameData = expActionName.exec(attribute.nodeName);
            if (actionNameData)
            {
              const actionName = actionNameData?.slice(1)?.pop();
              const actionValueData = expActionValue.exec(attribute?.nodeValue || '');

              if (actionValueData && actionName)
              {
                const [action, args] = actionValueData?.slice(1) || [];
                if (this._actions[action])
                {
                  const actionFunction = (e: Event) => {
                    return this._actions[action](e,args?.split(','));
                  }
                  if (!this._assignedActions[id])
                  {
                    this._assignedActions[id] = {[actionName]: actionFunction};
                  }
                  else
                  {
                    this._assignedActions[id][actionName] = actionFunction;
                  }
                  element.setAttribute('action-id', id);
                  element.addEventListener(actionName, actionFunction);
                }
                element.removeAttribute(`on-${actionName}`);
              }
            }
          })
        }
    })
  }

  private _removeCustomActions(): void {
    if (!this._element) return;
    Object.keys(this._assignedActions).forEach(key => {
      const element: HTMLElement | null = this._element?.querySelector(`[action-id = "${key}"]`);
      if (element)
      {
        Object.keys(this._assignedActions[key]).forEach(action => {
          if (action)
          {
            const evMap: keyof HTMLElementEventMap = <keyof HTMLElementEventMap>action;
            element.removeEventListener(evMap, this._assignedActions[key][action] as EventListener);
          }
        });
        element.removeAttribute('action-id');
      }
    })
    this._assignedActions = {};
  }

  private _makeRouteLinks(): void {
    if (!this._element) return;
    const links = this._element.querySelectorAll('a[data-link]');
    Object.values(links).forEach(link => {
      link.addEventListener('click',this._navigateRoute);
    })
  }

  private _removeRouteLinks(): void {
    if (!this._element) return;
    const links = this._element.querySelectorAll('a[data-link]');
    Object.values(links).forEach(link => {
      link.removeEventListener('click',this._navigateRoute);
    })
  }

  private _removeEvents(): void {
    const { events } = this._props;
    if (events && this._element) {
      Object.keys(events).forEach((eventName) => {
        const listener = events && events[eventName as keyof typeof events];
        if (listener) this._element.removeEventListener(eventName, listener);
      });
    }
  }

  private _render(): void {
    const block: HTMLElement = this.render() as HTMLElement;
    this._removeCustomActions();
    this._removeEvents();
    this._removeRouteLinks();
    if (this._element.tagName !== block.tagName)
    {
      this._element = document.createElement(block.tagName);
      Object.values(block.attributes).forEach((attr) => {
        this._element.setAttribute(attr.name, attr.value);
      });
    }
    this._element.innerHTML = '';

    Object.values(block.childNodes).forEach(item=>{
      this._element.appendChild(item);
    })
    this._addCustomActions();
    this._addEvents();
    this._makeRouteLinks();
    this.dispatchMount();
  }

  compile(template: string, props: IProp): Node {
    const propsAndDummy = {...props};
    Object.entries(this._components).forEach(([key, child]) => {
      propsAndDummy[key] = `<div data-id="${child._id}"></div>`;
    });
    const templateString: string = new Template(template, propsAndDummy).render();
    const node = new DOMParser().parseFromString(templateString, "text/html").body;
    if (node.childNodes.length > 2)
    {
      throw new Error('Component must be wrapped in one TAG');
    }
    Object.values(this._components).forEach((child) => {
      const dummy = node?.firstElementChild?.querySelector(`[data-id="${child._id}"]`);
      if (dummy)
      {
        dummy.replaceWith(child.content as HTMLElement);
      }
    });
    return node.firstElementChild || new Node();
  }

  render(): Node {
    return new Node();
  }

  get content(): HTMLElement {
    return this._element;
  }

  dispatchMount():void {
    this._eventBus.emit(EVENTS.COMPONENT_MOUNT);
  }

  dispatchUnmount():void {
    this._eventBus.emit(EVENTS.COMPONENT_UNMOUNT);
  }

  init(): void {
    this._element = document.createElement('i');
    this._eventBus.emit(EVENTS.COMPONENT_RENDER);
  }

  private _componentDidMount():void {
    Object.values(this._components).forEach((child) => {
      child.dispatchMount();
    });
    this.componentDidMount();
  }

  private _componentDidUpdate(oldProps: IProp, newProps: IProp) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  private _componentDidUnmount():void {
    this.componentDidUnmount();
    this._removeEvents();
    this._removeRouteLinks();
    this._removeCustomActions();
    this._element.innerHTML = '';
    Object.values(this._components).forEach((child) => {
      child.dispatchUnmount();
    });
  }

  componentDidMount(): void {}

  componentDidUnmount(): void {}

  componentDidUpdate(oldProps: IProp,newProps: IProp): boolean {
      return (!!oldProps && !!newProps);
  }
}
