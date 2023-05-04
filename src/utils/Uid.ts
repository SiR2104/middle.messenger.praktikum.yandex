export default new class Uid {
  private readonly _uniq: string;

  constructor() {
    const agent = Date.now().toString();
    this._uniq = agent.split('').reduce((acc:string, item: string) => {
      acc += item.charCodeAt(0).toString(16);
      return acc;
    }, '');
  }

  gen(): string {
    return `${this._uniq}-${5000 * Math.floor(Math.random() * new Date(Date.now()).getSeconds())}`;
  }
}();
