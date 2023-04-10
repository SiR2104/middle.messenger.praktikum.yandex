export default class Route
{
    path
    mask
    template
    query
    #keys = []
    #params = /#([A-z0-9]{0,40})?/g;
    constructor(path,template) {
        if (path)
        {
            this.path = path;
            if (this.#params.test(path))
            {
                this.#keys = path.match(this.#params).map(key => key.replaceAll('#',''));
                this.mask = path.replace(this.#params,'([A-z0-9]+)');
            }
            this.template = template;
        }
    }
    #setQuery(query)
    {
        this.query = query;
    }
    accord = (path) => {
        if (path && this.path === path) return this;
        if (path && this.mask)
        {
            const testData = path.match(new RegExp(`${this.mask}$`));
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