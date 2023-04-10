import ResetPassword from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import Button from '../../components/Button';
import Input from '../../components/Input';

const components = {
    'backButton': Button({caption:"Назад"},{onclick:'history.back()'}),
    'saveButton': Button({caption:"Сохранить"}),
    'input_old_password': Input({placeholder:'старый пароль',type: 'password', name:'oldPassword'}),
    'input_new_password': Input({placeholder:'новый пароль',type: 'password', name:'newPassword'}),
    'input_confirm_password': Input({placeholder:'подтверждение пароля',type: 'password'}),
};

const template = new Template(ResetPassword,components);
export default template;