import Component, {IProp} from '../../utils/Component';
import Template from 'bundle-text:./index.flopa';
import ChatCard from "../../components/ChatCard";
import DefaultInput from "../../components/DefaultInput";
import mock from "../../mockData/mock";
import '../Chat/index.scss';

export default class SelectChat extends Component
{
  constructor(props: IProp) {
    const mockData = mock();
    super({
      ...props,
      title:'Модуль1 - Выбор чата',
      description:'Выбор чата',
      actions: {
        send: (e: Event) => this._sendForm(e)
      },
      search: new DefaultInput({
        placeholder: 'поиск'
      }),
      self_card: new ChatCard({
        name: 'Иван',
        text: 'ivan@ivan.ru'
      }),
      ...mockData
    });
  }


  private _sendForm(e: Event): void
  {
    e.preventDefault();
    console.log(e.currentTarget);
  }

  render(): Node {
    return this.compile(Template,{
        search: this.components.search,
        self_card: this.components.self_card,
        mock_card1: this.components.mock_card1,
        mock_card2: this.components.mock_card2,
        mock_card3: this.components.mock_card3,
        mock_card4: this.components.mock_card4,
        mock_card5: this.components.mock_card5,
        mock_card6: this.components.mock_card6,
        mock_card7: this.components.mock_card7,
        mock_card8: this.components.mock_card8,
      }
    );
  }
}
