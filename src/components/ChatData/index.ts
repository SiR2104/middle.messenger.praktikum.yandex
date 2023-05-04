import Component, {IProp} from "../../utils/Component";
import Template from 'bundle-text:./index.flopa';
import './index.scss';
import mockMessages from "../../mockData/mockMessages";

export default class ChatData extends Component
{
  constructor(props:IProp) {
    const mock = mockMessages();
    super({
      ...props,
      ...mock,
      date: '30.05.2020',
    });
  }


  render(): Node {
    return this.compile(Template,{
      date: this.props.date,
      mock_message1: this.props.mock_message1,
      mock_message2: this.props.mock_message2,
      mock_message3: this.props.mock_message3,
      mock_message4: this.props.mock_message4,
    });
  }
}
