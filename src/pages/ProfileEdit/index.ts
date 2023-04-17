import ProfileEdit from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import Button from '../../components/Button';
import Input from '../../components/Input';

const components = {
    'backButton': Button({caption:'Назад', type: 'button'},{onclick:'history.back()'}),
    'saveButton': Button({caption:'Сохранить', type: 'submit'}),
    'input_name': Input({placeholder:'имя', name:'first_name'}),
    'input_mail': Input({placeholder:'почта', name:'email'}),
    'input_display_name': Input({placeholder:'отображаемое имя', name:'display_name'}),
    'input_login': Input({placeholder:'логин', name:'login'}),
    'input_lastname': Input({placeholder:'фамилия', name:'second_name'}),
    'input_phone': Input({placeholder:'телефон', name:'phone'}),
};

const template = new Template(ProfileEdit,components);
export default template;
