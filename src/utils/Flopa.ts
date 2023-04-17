'use strict';

import Template from "./Template";

declare global {
    interface Window {
        Flopa: Flopa
    }
}

import Route from './Route';
import Router from './Router';



window.onpopstate = () => {
    if (!Router.navigate()) Router.navigate('/error/404');
}

window.Flopa = new class Flopa {
    #routes = []
    #root = document.getElementById('root')
    getRoutes = () => this.#routes;
    findRoute = (path: string | URL) => this.#routes.find((item) => item.path === path);
    #getRoute = (path: string | URL) => {
        if (path)
        {
           return this.#routes.find((route)=>route.accord(path));
        }
    }
    registerRoute = (path: string | URL, template: Template) => (
        !this.findRoute(path)) &&
        this.#routes.push(new Route(path, template)
        )
    unregisterRoute = (path) => {
        this.#routes = this.#routes.filter(route => route !== this.findRoute(path));
    }
    render = (path: string | URL,params) => {
        if (path)
        {
            const route = this.#getRoute(path);
            if (route)
            {

                const template = route.template.build(params,route.query);
                document.title = template.meta?.title || 'Title';
                const metaText: string = template.meta?.description || '';
                if (metaText)
                {
                    const description = document.querySelector('meta[type=\'description\']');
                    if (!description)
                    {
                        const newDescription = document.createElement('meta');
                        newDescription.setAttribute('type','description');
                        newDescription.innerText = metaText;
                        document.head.appendChild(newDescription);
                    }
                    else
                    {
                        description.textContent = metaText;
                    }
                }
                this.#root.innerHTML = '';
                this.#root.appendChild(template.render());
                return true;
            }
        }
    }
}
