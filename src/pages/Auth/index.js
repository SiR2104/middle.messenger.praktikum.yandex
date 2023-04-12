import Auth from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import Button from '../../components/Button';
import Input from '../../components/Input';

const components = {
    'auth_button': Button({caption: 'Вход'}),
    'input_login': Input({placeholder:'логин', name: 'login'}),
    'input_password': Input({placeholder:'пароль', name: 'password',type: 'password'}),
};

const template = new Template(Auth,components);
export default template;
