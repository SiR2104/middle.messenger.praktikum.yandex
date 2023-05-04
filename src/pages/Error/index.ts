import Component, {IProp} from '../../utils/Component';
import Template from 'bundle-text:./index.flopa';
import './index.scss';

export default class ErrorPage extends Component
{
  constructor(props: IProp) {
    super({
      ...props,
      title:`Ошибка`,
      description:'Ошибка'
    });
  }
  render(): Node {
    const errors = new Map<number,string>([
      [404, 'страница не найдена'],
      [500, 'ошибка сервера'],
      [0, 'произошла ошибка']
    ]);
    const errorCode: number = Number(this.props?.code);
    return this.compile(Template,
      {
        code: errorCode || 'Ошибка', error: errors.get(errorCode) || 'Произошла какая-то ошибка'
      });
  }
}
