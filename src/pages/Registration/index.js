import Registration from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import '../Registration/index.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';

const components = {
    'reg_button': Button({caption: 'Зарегистрироваться'}),
    'input_name': Input({placeholder:'имя', name:'first_name'}),
    'input_mail': Input({placeholder:'почта', name:'email'}),
    'input_login': Input({placeholder:'логин', name:'login'}),
    'input_lastname': Input({placeholder:'фамилия', name:'second_name'}),
    'input_phone': Input({placeholder:'телефон', name:'phone'}),
    'input_password': Input({placeholder:'пароль', type: 'password', name:'password'}),
    'input_password_reply': Input({placeholder:'повтор пароля', type: 'password'}),
};

const template = new Template(Registration, components);
export default template;
