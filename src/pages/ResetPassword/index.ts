import Component, {IProp} from '../../utils/Component';
import Template from 'bundle-text:./index.flopa';
import Input from "../../components/Input";
import Button from "../../components/Button";
import Router from "../../utils/Router";
import Validator, {MASKS} from "../../utils/Validator";
import FormChecker from "../../utils/FormChecker";

export default class ResetPassword extends Component
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
      input_old_password: new Input({
        placeholder:'старый пароль',
        name: 'oldPassword',
        type: 'password',
        error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.PASSWORD)
        }
      }),
      input_new_password: new Input({
        placeholder:'новый пароль',
        type: 'password',
        error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        name: 'newPassword',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.PASSWORD)
        }
      }),
      input_confirm_password: new Input({
        placeholder:'подтверждение пароля',
        type: 'password',
        error: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        name: 'confirmPassword',
        actions: {
          focus: (e: Event) => this._inputFocus(e),
          blur: (e: Event) => this._inputBlur(e, MASKS.PASSWORD)
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
      input_old_password: this.components.input_mail,
      input_new_password: this.components.input_login,
      input_confirm_password: this.components.input_name
      }
    );
  }
}
