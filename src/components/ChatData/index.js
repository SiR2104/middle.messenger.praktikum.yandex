import ChatData from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import '../ChatData/index.scss';
import Message from "../Message";

const components = {
    'mock_message1': Message({type:'target',text:'привет, как дела?',date:'16:04'}),
    'mock_message2': Message({type:'self',text:'привет, как дела?',date:'16:05'}),
    'mock_message3': Message({type:'self',text:'привет, как дела?',date:'16:06'}),
    'mock_message4': Message({type:'self',text:'привет, как дела?',date:'16:07'}),
}

export default (params, attributes) => new Template(ChatData, components, params, attributes);
