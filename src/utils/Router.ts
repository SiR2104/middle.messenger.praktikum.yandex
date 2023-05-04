import Component from "./Component";

export default new class Router {
  private readonly location: Location = window.location;

  params = () => {
    if (this.location.search) {
      const query = new URLSearchParams(
        this.location.search.substring(1, this.location.search.length)
      );
      return Object.fromEntries(query);
    }
    return {};
  };

  navigate = (path?: string | null) => {
    if (window.Flopa) {
      window.history.pushState({ path }, '', path || '');
      return window.Flopa.render(path || this.location.pathname);
    }
  };

  get current() {
    if (window.Flopa) {
      return <Component>window.Flopa.getCurrentPage();
    }
  };

  back() {
    const path = window.Flopa.back();
    window.history.pushState({ path: (path || '/') }, '', path || '/');
    return window.Flopa.render(path || '/');
  }

  register = (path: string | URL, page: typeof Component) => {
    if (window.Flopa) {
      window.Flopa.registerRoute(path, page);
    }
  };
}();
