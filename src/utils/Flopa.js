'use strict';
import Route from './Route';
import Router from './Router';

window.onpopstate = () => {
    if (!Router.navigate()) Router.navigate('/error/404');
}

window.Flopa = new class Flopa {
    #routes = []
    #root = document.getElementById('root')
    getRoutes = () => this.#routes;
    findRoute = (path) => this.#routes.find((item) => item.path === path);
    #getRoute = (path) => {
        if (path)
        {
           return this.#routes.find((route)=>route.accord(path));
        }
    }
    registerRoute = (path, template) => (
        !this.findRoute(path)) &&
        this.#routes.push(new Route(path, template)
        )
    unregisterRoute = (path) => {
        this.#routes = this.#routes.filter(route => route !== this.findRoute(path));
    }
    render = (path,params) => {
        if (path)
        {
            const route = this.#getRoute(path);
            if (route)
            {

                const template = route.template.build(params,route.query);
                document.title = template.meta?.title || "Title";
                document.description = template.meta?.description || "Description";
                this.#root.innerHTML = '';
                this.#root.appendChild(template.render());
                return true;
            }
        }
    }
}
