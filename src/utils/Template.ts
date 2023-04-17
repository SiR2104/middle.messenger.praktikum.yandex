import Router from './Router';


export interface Attribute  {
    name: string,
    value: string | number
}

export default class Template
{
    #page
    #raw
    #addProps = {}
    #attributes = {}
    meta
    components: { [p: string]: Template} | undefined
    #descriptionExp = /\[\[(.*)\]\]/
    #dataExp = /\{\{(.*)\}\}/g
    #componentExp = /\|\|(.*)\|\|/g
    #template
    constructor(page, components? : {[key:string]: Template}, addProps?: {key: string, value: string}[], attributes?: Attribute) {
        this.#raw = page;
        this.components = components;
        this.#addProps = addProps;
        this.#attributes = attributes;
    }
    placeComponents()
    {
        const tempPlaces = Array.from(this.#template.querySelectorAll('p[data-component]'));
        tempPlaces.forEach((place)=>{
            const componentName = place.dataset.component;
            if (this.components) {
                const component = this.components[componentName].build();
                place.replaceWith(component?.render() || "");
            }
        });
    }
    placeLinks()
    {
        const tempPlaces = Array.from(this.#template.querySelectorAll('a'));
        tempPlaces.forEach((place)=>{
            if (!place.getAttribute("href").includes('://'))
            {
                place.addEventListener('click',(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    if (!Router.navigate(e.currentTarget.getAttribute('href'))) Router.navigate('/error/404');
                })
            }
        });
    }
    build(params?,query?)
    {
        this.#page = this.#raw;
        let data;
        const variables = {...params,...query, ...this.#addProps};
        //replace variables
        while (data = this.#dataExp.exec(this.#page))
        {
            this.#page = this.#page.replaceAll(data[0],variables[data[1]] || '');
        }

        //replace components
        while (data = this.#componentExp.exec(this.#page))
        {
            this.#page = this.#page.replace(data[0],`<p data-component='${data[1]}'></p>`);
        }

        //page description extract
        const descriptionField = this.#descriptionExp.exec(this.#page);
        if (descriptionField)
        {
            const metas = Object.fromEntries(new URLSearchParams(descriptionField.pop()?.split(',')?.join('&')));
            if (metas) this.meta = metas;
        }
        this.#page = this.#page.replace(this.#descriptionExp,'');
        const template = document.createElement('template');
        template.innerHTML = this.#page;
        this.#template = template.content.cloneNode(true);
        this.#attributes && Object.entries(this.#attributes).forEach(([key,value])=>{
            this.#template.firstChild.setAttribute(key,<string>value);
        });
        this.placeComponents();
        this.placeLinks();
        return this;
    }
    render()
    {
        return this.#template;
    }
}
