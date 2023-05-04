import Component from '../../utils/Component';
import Template from 'bundle-text:./index.flopa';
import './index.scss';

export default class IndexPage extends Component
{
  constructor() {
    super();
    this.setProps({title:'Модуль1 - Спринт 2',description:'Стартовая страница'});
  }
  render(): Node {
    return this.compile(Template,{});
  }
}
