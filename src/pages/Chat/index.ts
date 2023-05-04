import Component, {IProp} from '../../utils/Component';
import Template from 'bundle-text:./index.flopa';
import ChatCard from "../../components/ChatCard";
import DefaultInput from "../../components/DefaultInput";
import mock from "../../mockData/mock";
import './index.scss';
import ChatBottomPanel from "../../components/ChatBottomPanel";
import ChatTopPanel from "../../components/ChatTopPanel";
import ChatData from "../../components/ChatData";

export default class Chat extends Component
{
  constructor(props: IProp) {
    const mockData = mock();
    super({
      ...props,
      title:'Модуль1 - Чат',
      description:'Чат',
      search: new DefaultInput({
        placeholder: 'поиск'
      }),
      self_card: new ChatCard({
        name: 'Иван',
        text: 'ivan@ivan.ru'
      }),
      chat_top_panel: new ChatTopPanel({
        name: 'Иван',
      }),
      chat_data: new ChatData({
        name: 'Иван',
        text: 'ivan@ivan.ru'
      }),
      chat_bottom_panel: new ChatBottomPanel({}),
      ...mockData
    });
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
        chat_top_panel: this.components.chat_top_panel,
        chat_data: this.components.chat_data,
        chat_bottom_panel: this.components.chat_bottom_panel,
      }
    );
  }
}
