import Route from './Route';
import Router from './Router';
import Component, {IProp} from "./Component";

window.onpopstate = () => {
  if (!Router.navigate()) Router.navigate('/error/404');
};

class Flopa {
  private routes:Route[] = [];

  private _currentPage: Component | undefined;

  private root = document.getElementById('root');

  private _backStack: string[] = ['/'];

  getRoutes = ():Route[] => this.routes;

  getCurrentPage(): Component {
    return <Component>this._currentPage;
  }

  back(): string
  {
    this._backStack?.pop();
    return this._backStack[this._backStack.length-1];
  }

  private _setCurrentPage(page: Component) {
    this._currentPage = page;
  }

  findRoute = (path: string | URL):Route | undefined =>
    this.routes.find((item) => item.path === path);

  private getRoute = (path: string | URL):Route | undefined => {
    if (path) {
      return this.routes.find((route) => route.accord(path));
    }
  };

  registerRoute = (path: string | URL, page: typeof Component) => (
    !this.findRoute(path))
    && this.routes.push(new Route(path, page));

  unregisterRoute = (path: string) => {
    this.routes = this.routes.filter((route) => route !== this.findRoute(path));
  };

  render = (path: string | URL) => {
    if (path) {
      const route = this.getRoute(path);
      if (route) {
        const pageHandler = route['page'] as typeof route['page'] &
          ((tag: string, props: object) => Component);
        const page = new pageHandler(route.query as IProp);
        document.title = <string>page.props?.title || 'Title';
        const metaText: string = <string>page.props?.description || '';
        if (metaText) {
          const description = document.querySelector('meta[type=\'description\']');
          if (!description) {
            const newDescription = document.createElement('meta');
            newDescription.setAttribute('type', 'description');
            newDescription.innerText = metaText;
            document.head.appendChild(newDescription);
          } else {
            description.textContent = metaText;
          }
        }
        if (this.root && this.root.childNodes.length > 0) this.root.innerHTML = '';
        if (this._currentPage)
        {
            const currentPage: Component = this._currentPage;
            currentPage.dispatchUnmount();
            this._currentPage = undefined;
        }
        this._setCurrentPage(page);
        this._backStack.push(path as string);
        this.root?.appendChild(page?.content);
        return true;
      }
    }
  };
}

declare global {
  interface Window {
    Flopa: Flopa
    EventBus: [];
  }
}

window.Flopa = new Flopa();
