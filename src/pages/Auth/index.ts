import Component, {IProp} from '../../utils/Component';
import Template from 'bundle-text:./index.flopa';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Validator, {MASKS} from "../../utils/Validator";
import FormChecker from "../../utils/FormChecker";

export default class AuthPage extends Component
{
  private _validator = new Validator();
  constructor(props: IProp) {
    super({
      ...props,
      title:'Модуль1 - Авторизация',
      description:'Авторизация пользователя',
      actions: {
        send: (e: Event) => FormChecker(e)
      },
      input_login: new Input({
        placeholder:'логин',
        name: 'login',
        error: 'от 3 до 20 символов, латиница, может содержать цифры',
        mask: MASKS.LOGIN,
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e,MASKS.LOGIN)
        }
      }),
      input_password: new Input({
        placeholder:'пароль',
        error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        name: 'password',
        type: 'password',
        mask: MASKS.PASSWORD,
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e,MASKS.PASSWORD)
        }
      }),
      auth_button: new Button({
        caption:'Авторизация',
        type: 'submit',
      })
    });
  }

  private _inputFocus(e: Event):void
  {
    (e.currentTarget as HTMLElement).removeAttribute('invalid');
  }

  private _inputBlur(e: Event, who: string):void
  {
    const element: HTMLElement = e.currentTarget as HTMLElement;
    if (!this._validator.is((element as HTMLInputElement).value, who))
      element.setAttribute('invalid','true');
  }

  render(): Node {
    return this.compile(Template,{
        auth_button: this.components.auth_button,
        input_login: this.components.input_login,
        input_password: this.components.input_password,
    }
    );
  }
}
