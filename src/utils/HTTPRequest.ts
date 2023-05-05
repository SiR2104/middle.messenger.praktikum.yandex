enum METHODS {
  GET='GET',
  POST='POST',
  PUT='PUT',
  DELETE='DELETE',
  PATCH='PATCH'
}

type Options = {
  method: METHODS;
  data?: any;
  header?: Header;
};

type Header = {
  [key: string]: string
}

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<unknown>

export default new class HTTPRequest {
  private xhr: XMLHttpRequest;

  request = (url: string,
             options: Options = { method: METHODS.GET }): Promise<XMLHttpRequest> =>
    new Promise<XMLHttpRequest>((resolve, reject) => {
    const { method, data, header } = options;
    this.xhr = new XMLHttpRequest();
    this.xhr.open(method, url);
    if (header) {
      Object.entries(header).forEach(([key, value]) => this.xhr.setRequestHeader(key, value));
    }
    this.xhr.onload = () => resolve(this.xhr);
    this.xhr.onabort = reject;
    this.xhr.onerror = reject;
    this.xhr.ontimeout = reject;
    if (method === METHODS.GET || !data) {
      this.xhr.send();
    } else {
      this.xhr.send(data);
    }
  });

  get: HTTPMethod = (url: string, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET });

  post: HTTPMethod = (url: string, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST });

  put: HTTPMethod = (url: string, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT });

  patch: HTTPMethod = (url: string, options = {}) =>
    this.request(url, { ...options, method: METHODS.PATCH });

  delete: HTTPMethod = (url: string, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE });
}();
