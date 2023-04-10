import ChatBottomPanel from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import '../ChatBottomPanel/index.scss';
import DefaultInput from "../DefaultInput";

const components = {
    'input': DefaultInput({placeholder:'напишите текст', name:'message'},{style:'flex-grow:1'})
}

export default (params, attributes) => new Template(ChatBottomPanel, components, params, attributes);