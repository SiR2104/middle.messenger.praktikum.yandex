import Component, {IProp} from "../../utils/Component";
import Template from 'bundle-text:./index.flopa';
import './index.scss';
import DefaultInput from "../DefaultInput";
import Validator from "../../utils/Validator";

export default class ChatBottomPanel extends Component
{
  private _validator = new Validator();
  constructor(props:IProp) {
    super({
      ...props,
      input: new DefaultInput({
        name: 'message',
        placeholder: 'напишите текст',
      }),
      actions: {
        attachHandler: () => this._attachHandler(),
        sendHandler: () => this._sendHandler()
      },
    });
  }

  private _attachHandler()
  {
      console.log('attach handler');
  }

  private _sendHandler()
  {
    const message = this.components.input.content as HTMLInputElement;
    if (this._validator.isNotEmpty(message.value))
    {
      console.log(message.value);
    }
    else
    {
      throw new Error('Сообщение пустое')
    }
  }

  render(): Node {
    return this.compile(Template,{

    });
  }
}
