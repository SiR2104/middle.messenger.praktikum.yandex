import SelectChat from 'bundle-text:./index.flopa';
import Template from '../../utils/Template';
import '../Chat/index.scss';
import DefaultInput from '../../components/DefaultInput';
import ChatCard from '../../components/ChatCard';

const components = {
    'search': DefaultInput({placeholder:"поиск"}),
    'self_card': ChatCard({name:'Иван',text:'ivan@ivan.ru'}),
    'mock_card1': ChatCard({name:'Светлана',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'12:00',count:'3'}),
    'mock_card2': ChatCard({name:'Игорь',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'9:00',count:'10'}),
    'mock_card3': ChatCard({name:'Рик',you:'Вы: ',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'пт'}),
    'mock_card4': ChatCard({name:'Морти',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'20.03.2023',count:'1'}),
    'mock_card5': ChatCard({name:'Антон',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'19.03.2023',count:'1'}),
    'mock_card6': ChatCard({name:'Ирина',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'18.03.2023'}),
    'mock_card7': ChatCard({name:'Василий Витальевич',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'17.03.2023',count:'2'}),
    'mock_card8': ChatCard({name:'Анатолий',text:'Привет, текст какой-то тут должен быть совершенно случайно',date:'15.03.2023'}),
};

const template = new Template(SelectChat,components);
export default template;