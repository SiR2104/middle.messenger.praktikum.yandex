import Component, {IProp} from "../../utils/Component";
import Template from 'bundle-text:./index.flopa';
import './index.scss';

export default class Input extends Component
{
  constructor(props:IProp) {
    super(props);
  }
  render(): Node {
    return this.compile(Template,{
      type: this.props.type,
      name: this.props.name,
      placeholder: this.props.placeholder,
      error: this.props.error,
      value: this.props.value,
      mask: this.props.mask
    });
  }
}
