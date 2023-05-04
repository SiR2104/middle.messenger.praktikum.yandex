interface IProp {
  [key: string]: string | number
}

export default class Template {
  private readonly _page: string;

  private readonly _props: IProp;

  private _content: string = '';

  private dataExp: RegExp = /{{([A-z0-9]+)}}/g;

  constructor(page: string, props: any) {
    this._page = page;
    if (props) {
      const self = this;
      this._props = new Proxy(props as IProp, {
        get(target: IProp, prop: string) {
          if (prop.indexOf('_') === 0) {
            throw new Error('Param restricted');
          }
          return target[prop];
        },
        set(target: IProp, prop: string, value: string): boolean {
          if (prop.indexOf('_') === 0) {
            throw new Error('Param restricted');
          }
          target[prop] = value;
          self._compile();
          return true;
        },
        deleteProperty(target: IProp, prop: string) {
          if (prop.indexOf('_') === 0) {
            throw new Error('Нет прав');
          }
          delete target[prop];
          self._compile();
          return true;
        },
      });
    }
    this._compile();
  }

  private _compile(): void {
    this._content = this._page;
    let param = this.dataExp.exec(this._page);
    while (param) {
      const [key, value] = param;
      this._content = this._content.replace(key, this.props[value]?.toString() || '');
      param = this.dataExp.exec(this._page);
    }
    this.compile();
  }

  get props() {
    return this._props;
  }

  compile(): void {}

  render(): string {
    return this._content;
  }
}
