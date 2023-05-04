import Component, {IProp} from '../../utils/Component';
import Template from 'bundle-text:./index.flopa';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Router from "../../utils/Router";
import Validator, {MASKS} from "../../utils/Validator";
import FormChecker from "../../utils/FormChecker";

export default class ProfileEditPage extends Component
{
  private _validator = new Validator();
  constructor(props: IProp) {
    super({
      ...props,
      title:'Модуль1 - Редактирование профиля',
      description:'Редактирование профиля',
      actions: {
        send: (e: Event) => FormChecker(e)
      },
      input_mail: new Input({
        placeholder:'почта',
        name: 'email',
        mask: MASKS.EMAIL,
        error: 'латиница, может включать цифры и спецсимволы вроде дефиса,' +
          ' обязательно должна быть «собака» (@)',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.EMAIL)
        }
      }),
      input_name: new Input({
        placeholder:'имя',
        name: 'first_name',
        mask: MASKS.NAME,
        error: 'Не должно быть пустым',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.NOT_EMPTY)
        }
      }),
      input_display_name: new Input({
        placeholder:'отображаемое имя',
        name: 'display_name',
        mask: MASKS.NOT_EMPTY,
        error: 'Не должно быть пустым',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.NOT_EMPTY)
        }
      }),
      input_phone: new Input({
        placeholder:'телефон',
        name: 'phone',
        error: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
        mask: MASKS.PHONE,
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.PHONE)
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
      input_login: new Input({
        placeholder:'логин',
        error: 'от 3 до 20 символов, латиница, может содержать цифры',
        name: 'login',
        mask: MASKS.LOGIN,
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.LOGIN)
        }
      }),
      back_button: new Button({
        caption:'Назад',
        type: 'submit',
        events: {
          click: (e: Event) => this._backButton(e)
        }
      }),
      save_button: new Button({
        caption:'Сохранить',
        type: 'submit',
      })
    });
  }

  private _backButton(e: Event): void
  {
    e.preventDefault();
    Router.back();
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
        back_button: this.components.back_button,
        save_button: this.components.save_button,
        input_mail: this.components.input_mail,
        input_login: this.components.input_login,
        input_name: this.components.input_name,
        input_lastname: this.components.input_lastname,
        input_display_name: this.components.input_display_name,
        input_phone: this.components.input_phone,
      }
    );
  }
}
