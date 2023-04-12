## Мессенджер
Учебный проект
Решение по спринту №1
Дизайн можно посмотреть по ссылке: [Фигма](https://www.figma.com/file/Ig8HvCVka3aRB5Xq7Hpu1a/module-1?node-id=9-475&t=5dmcRrW8QNR4fpyL-0)
Ссылка на прототип на netlify: [Netlify](https://starlit-buttercream-ee4fa3.netlify.app/)
## Сборка и установка

- `npm run dev` — запуск версии для разработчика,
- `npm run start` — тестовый запуск,
- `npm run build` — сборка проекта.

## Особенности проекта

В проекте реализован собственный роутинг (+ динамический роутинг, шаблон может получать GET запросы и любые динамические запросы из адресной строки)
Также реализован собственный шаблонизатор. (Нуждается в доработках)

## Описание
Проект представляет собой web приложение для общения людей.
Функционал:
- Можно общаться
- Добавлять новых пользователей
- Удалять пользователей
- Искать по чатам
- Редактировать профиль
- Выдавать ошибки

## **Описание структуры**
Далее будет представлено описание того, как работать с самописным фрэймворком.
- /index.html - главный макет приложения, в нем вы можете найти элемент с ID = root,
в этот элемент помещается контент из страниц. По сути, этим элементом может быть любой тэг поддерживающий вложение.
- /index.js - инициализатор web приложения, в нем регистрируются страницы, а также роуты для них.
В данном файле, помимо страниц подключаются все основные классы для работы приложения.
```
  import './src/public/style/document.scss'; - основной файл стилей
  import './src/utils/Flopa'; - основной модуль приложения (описание методов будет ниже)
  import Router from './src/utils/Router'; - модуль роутинга приложения.
```
```
if (!Router.navigate()) Router.navigate('/error/404'); - метод рендеринга на страницу, именно в этот момент страница отобразиться на экране.
```

Смена страниц происходит без перезагрузки.

Страницы хранятся в папке /src/pages/, но это не обязательно.
Для названия компонентов и страниц используется стиль CamelCase.
Структура страницы:
- index.js - объявление страницы
```
import Index from 'bundle-text:./index.flopa'; - загружаем страницу из шаблона
import Template from "../../utils/Template"; - класс шаблона для страниц и компонентов.
import "../Index/index.scss"; - файл стилей для страницы
export default new Template(Index); - экспорт
```
- index.flopa - файл шаблона
По своей сути это html подобный файл, за исключение некоторых частей.
Синтаксис:
 ||имя_компонента||
 {{параметр}}
 и в шапке
 [[title='заголовок страницы',description='описание']]

```
Пример:
[[title=Спринт 1,description=Задача спринт 1]]
<section class="frame frame_index">
    <h2>Страницы</h2>
    <a href="/error/404">Ошибка 404</a>
    <a href="/error/500">Ошибка 500</a>
    <a href="/auth">Авторизация</a>
    <a href="/reg">Регистрация</a>
    <a href="/profile">Профиль</a>
    <a href="/profile-edit">Редактировать профиль</a>
    <a href="/reset-password">Сменить пароль</a>
    <a href="/select-chat">Выбор чата</a>
    <a href="/chat">Чат</a>
</section>

```
Дополнительно, при объявлении страницы или компонента можно добавить аттрибуты к тэгам, они добавятся только к первому корневому элементу страницы или компонента.
```
import Chat from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import '../Chat/index.scss';
import ChatCard from '../../components/ChatCard';
import ChatTopPanel from '../../components/ChatTopPanel';
import ChatBottomPanel from '../../components/ChatBottomPanel';
import DefaultInput from "../../components/DefaultInput";
import ChatData from "../../components/ChatData";

const components = {
    'search': DefaultInput({placeholder:"поиск"}),
    'self_card': ChatCard({name:'Иван',text:'ivan@ivan.ru'}),
    'mock_card1': ChatCard({name:'Светлана',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'12:00',count:'3'}),
    'mock_card2': ChatCard({name:'Игорь',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'9:00',count:'10'}),
    'mock_card3': ChatCard({name:'Рик',you:'Вы: ',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'пт'},{'data-selected':true}),
    'mock_card4': ChatCard({name:'Морти',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'20.03.2023',count:'1'}),
    'mock_card5': ChatCard({name:'Антон',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'19.03.2023',count:'1'}),
    'mock_card6': ChatCard({name:'Ирина',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'18.03.2023'}),
    'mock_card7': ChatCard({name:'Василий Витальевич',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'17.03.2023',count:'2'}),
    'mock_card8': ChatCard({name:'Анатолий',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'15.03.2023'}),
    'chat_top_panel': ChatTopPanel({name:'Рик'}),
    'chat_data': ChatData(),
    'chat_bottom_panel': ChatBottomPanel(),
};

const template = new Template(Chat,components);
export default template;

Конструктор для жаблона: 
new Template(страница или компонент,именованные компоненты в объекте, аттрибуты для корневого компонента);
Последние два параметра необязательны.
```

С компонентов ситуация аналогичная, за исключением экспорта, экспорт происходит функции.
```
export default (params, attributes) => new Template(ChatData, components, params, attributes);
```
Вложенность компонентов не ограничена

## **Версии использованных библиотек**

- "@parcel/transformer-inline-string": "^2.8.3",
- "@parcel/transformer-sass": "^2.8.3",
- "parcel": "^2.8.3",
- "scss": "^0.2.4"
- "express": "^4.18.2"
- "node": "^18.14.2"
