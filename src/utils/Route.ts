import Template from "./Template";

export default class Route
{
    path
    mask
    template
    query
    #keys = []
    #params = /#([A-z0-9]{0,40})?/g;
    constructor(path: string | URL,template: Template) {
        if (path)
        {
            this.path = path.toString();
            if (this.#params.test(this.path))
            {
                this.#keys = this.path.match(this.#params).map(key => key.replaceAll('#',''));
                this.mask = this.path.replace(this.#params,'([A-z0-9]+)');
            }
            this.template = template;
        }
    }

    #setQuery(query: { [p: number]: string | number } | undefined)
    {
        this.query = query;
    }
    accord = (path: string | URL) => {
        if (path && this.path === path) return this;
        if (path && this.mask)
        {
            const testData = path.toString().match(new RegExp(`${this.mask}$`));
            if (testData && testData.length-1 === this.#keys.length)
            {
                const paramValues = [...testData];
                paramValues.splice(0,1);
                this.#setQuery(this.#keys.map((item,i)=>({[item]:paramValues[i]})).pop())
                return this;
            }
        }
    }
}
