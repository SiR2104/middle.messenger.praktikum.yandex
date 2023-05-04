import Component, {IProp} from '../../utils/Component';
import Template from 'bundle-text:./index.flopa';
import Input from "../../components/Input";
import Button from "../../components/Button";
import './index.scss';
import Validator, {MASKS} from "../../utils/Validator";
import FormChecker from "../../utils/FormChecker";

export default class RegistrationPage extends Component
{
  private _validator = new Validator();
  constructor(props: IProp) {
    super({
      ...props,
      title:'Модуль1 - Регистрация',
      description:'Регистрация пользователя',
      actions: {
        send: (e: Event) => FormChecker(e)
      },
      input_mail: new Input({
        placeholder:'почта',
        name: 'email',
        error: 'латиница, может включать цифры и спецсимволы вроде дефиса,' +
          ' обязательно должна быть «собака» (@)',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.EMAIL)
        }
      }),
      input_login: new Input({
        placeholder:'логин',
        name: 'login',
        error: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.LOGIN)
        }
      }),
      input_name: new Input({
        placeholder:'имя',
        name: 'first_name',
        error: 'латиница или кириллица, первая буква должна быть заглавной',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.NAME)
        }
      }),
      input_lastname: new Input({
        placeholder:'фамилия',
        name: 'second_name',
        error: 'Не должно быть пустым',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.NOT_EMPTY)
        }
      }),
      input_password: new Input({
        placeholder:'пароль',
        error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        name: 'password',
        type: 'password',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.PASSWORD)
        }
      }),
      input_phone: new Input({
        placeholder:'телефон',
        name: 'phone',
        error: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.PHONE)
        }
      }),
      input_password_reply: new Input({
        placeholder:'повтор пароля',
        name: 'password2',
        error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        type: 'password',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.PASSWORD)
        }
      }),
      reg_button: new Button({
        caption:'Зарегистрироваться',
        type: 'submit'
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
        reg_button: this.components.reg_button,
        input_mail: this.components.input_mail,
        input_login: this.components.input_login,
        input_name: this.components.input_name,
        input_lastname: this.components.input_lastname,
        input_password: this.components.input_password,
        input_phone: this.components.input_phone,
        input_password_reply: this.components.input_password_reply,
      }
    );
  }
}
