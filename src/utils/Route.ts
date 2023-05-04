import Component from "./Component";

export interface IQuery
{
  [key: number]: string | number;
}

export default class Route {
  path: string;

  mask;

  page: typeof Component;

  query: IQuery | undefined;

  private keys:string[] | undefined = [];

  private params = /#([A-z0-9]{0,40})?/g;

  constructor(path: string | URL, page: typeof Component) {
    if (path) {
      this.path = path.toString();
      if (this.params.test(this.path)) {
        this.keys = this.path?.match(this.params)?.map((key: string) => key.replaceAll('#', ''));
        this.mask = this.path?.replace(this.params, '([A-z0-9]+)');
      }
      this.page = page;
    }
  }

  private setQuery(query?:IQuery) {
    this.query = query;
  }

  accord = (path: string | URL) => {
    if (path && this.path === path) return this;
    if (path && this.mask) {
      const testData = path.toString().match(new RegExp(`${this.mask}$`));
      if (testData && testData.length - 1 === this.keys?.length) {
        const paramValues = [...testData];
        paramValues.splice(0, 1);
        this.setQuery(this.keys?.map((item, i) => ({ [item]: paramValues[i] })).pop());
        return this;
      }
    }
  };
}
