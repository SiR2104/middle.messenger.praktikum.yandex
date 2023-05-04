export enum MASKS
{
  NAME = 'NAME',
  LOGIN = 'LOGIN',
  EMAIL = 'EMAIL',
  NOT_EMPTY = 'NOT_EMPTY',
  PASSWORD = 'PASSWORD',
  PHONE = 'PHONE',
}

interface IExps
{
  [key: string]: RegExp
}

export default class Validator {
  private _exps: IExps = {};

  constructor() {
    this._exps[MASKS.NAME] = new RegExp(/^[A-ZА-Я][A-zА-я]+$/);
    this._exps[MASKS.LOGIN] = new RegExp(/^(?![0-9]+$)[A-Z0-9_-]{3,20}$/i);
    this._exps[MASKS.EMAIL] = new RegExp(/^[A-z0-9.-]+@[A-z0-9.-]+\.[A-z]{2,}$/);
    this._exps[MASKS.NOT_EMPTY] = new RegExp(/^[A-z0-9\W]+$/);
    this._exps[MASKS.PASSWORD] = new RegExp(/^[A-Z]+(?:.*[0-9].*){7,}/);
    this._exps[MASKS.PHONE] = new RegExp(/^\+?\d{10,15}$/);
  }

  isName(text:string)
  {
    return this._exps[MASKS.NAME].test(text);
  }

  isLogin(text:string)
  {
    return this._exps[MASKS.LOGIN].test(text);
  }

  isEmail(text:string)
  {
    return this._exps[MASKS.EMAIL].test(text);
  }

  isNotEmpty(text:string)
  {
    return this._exps[MASKS.NOT_EMPTY].test(text);
  }

  isPassword(text:string)
  {
    return this._exps[MASKS.PASSWORD].test(text);
  }

  isPhone(text:string)
  {
    return this._exps[MASKS.PHONE].test(text);
  }

  is(text: string, who: string)
  {
    const mask: string = MASKS[who as keyof typeof MASKS];
    return this._exps[mask].test(text);
  }

}
