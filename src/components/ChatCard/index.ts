import Component, {IProp} from "../../utils/Component";
import Template from 'bundle-text:./index.flopa';
import './index.scss';

export default class ChatCard extends Component
{
  constructor(props:IProp) {
    super({
      ...props,
      events: {
        click: () => this._cardClickHandler()
      }
    });
  }

  private _cardClickHandler(): void
  {
    console.log('click', this.props.name);
  }

  render(): Node {
    return this.compile(Template,{
      name: this.props.name,
      date: this.props.date,
      you: this.props.you,
      text: this.props.text,
      count: this.props.count,
    });
  }
}
