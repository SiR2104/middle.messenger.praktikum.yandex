import DefaultInput from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import './index.scss';

export default (params?, attributes?) => new Template(DefaultInput,undefined, params, attributes);
