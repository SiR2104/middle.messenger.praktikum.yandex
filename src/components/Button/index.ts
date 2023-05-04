import Component, {IProp} from "../../utils/Component";
import Template from 'bundle-text:./index.flopa';
import './index.scss';

export default class Button extends Component
{
  constructor(props:IProp) {
    super(props);
  }
  render(): Node {
    return this.compile(Template,{type: this.props.type, caption: this.props.caption});
  }
}
