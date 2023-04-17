import Template from "./Template";

export default new class Router
{
    #location = window.location
    params = () => {
        if (this.#location.search)
        {
            const query = new URLSearchParams(this.#location.search.substring(1,this.#location.search.length));
            return Object.fromEntries(query);
        }
        return {};
    }
    navigate = (path?: string) => {
        if (window.Flopa)
        {
            window.history.pushState({path},"", path || "");
            return window.Flopa.render(path || this.#location.pathname,this.params());
        }
    }
    register = (path: string | URL, template: Template) => {
        if (window.Flopa)
        {
            window.Flopa.registerRoute(path, template);
        }
    }
}
