import Component, {IProp} from "../../utils/Component";
import Template from 'bundle-text:./index.flopa';
import './index.scss';

export default class Message extends Component
{
  constructor(props:IProp) {
    super({
      ...props,
    });
  }


  render(): Node {
    return this.compile(Template,{
      text: this.props.text,
      type: this.props.type,
      date: this.props.date,
    });
  }
}
