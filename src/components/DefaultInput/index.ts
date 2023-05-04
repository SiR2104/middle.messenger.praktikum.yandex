import Component, {IProp} from "../../utils/Component";
import Template from 'bundle-text:./index.flopa';
import './index.scss';

export default class DefaultInput extends Component
{
  constructor(props:IProp) {
    super({
      ...props,
      events: {
        keydown: (e: Event) => this._keydownHandler(e),
        focus: (e: Event) => this._focusHandler(e),
        blur: (e: Event) => this._blurHandler(e),
      }
    });
  }

  private _keydownHandler(e: Event)
  {
    console.log(e);
  }

  private _focusHandler(e: Event)
  {
    console.log(e);
  }

  private _blurHandler(e: Event)
  {
    console.log(e);
  }

  render(): Node {
    return this.compile(Template,{
      name: this.props.name,
      placeholder: this.props.placeholder,
    });
  }
}
