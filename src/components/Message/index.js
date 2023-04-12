import Message from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import '../Message/index.scss';


export default (params, attributes) => new Template(Message, null, params, attributes);
