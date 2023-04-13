import Profile from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import '../Profile/index.scss';
import ProfilePhoto from '../../components/ProfilePhoto';
import Button from '../../components/Button';

const components = {
    'photo': ProfilePhoto(),
    'backButton': Button({caption:'Назад', type: 'button'}, {onclick:'history.back()'})
};

const template = new Template(Profile,components);
export default template;
