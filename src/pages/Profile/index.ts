import Component, {IProp} from '../../utils/Component';
import Template from 'bundle-text:./index.flopa';
import Button from "../../components/Button";
import './index.scss';
import ProfilePhoto from "../../components/ProfilePhoto";
import Router from "../../utils/Router";

export default class ProfilePage extends Component
{
  constructor(props: IProp) {
    super({
      ...props,
      title:'Модуль1 - Просмотр профиля',
      description:'Профиль пользователя',
      param_email:'mock@data.ru',
      param_login:'crazy_man',
      param_name:'Иван',
      param_lastname:'Иванов',
      param_phone:'+79130003232',
      back_button: new Button({
        caption:'Назад',
        type: 'button',
        events: {
          click: (e: Event) => this._backButton(e)
        }
      }),
      photo: new ProfilePhoto({})
    });
  }


  private _backButton(e: Event): void
  {
    e.preventDefault();
    Router.back();
  }

  render(): Node {
    return this.compile(Template,{
        back_button: this.components.back_button,
        param_email: this.props.param_email,
        param_login: this.props.param_login,
        param_name: this.props.param_name,
        param_lastname: this.props.param_lastname,
        param_phone: this.props.param_phone,
      }
    );
  }
}
