import ChatCard from "../components/ChatCard";
import {IProp} from "../utils/Component";

export default function mock(): IProp
{
  const data: IProp = {
    mock_card1: new ChatCard({
      name: 'Светлана',
      text: 'Привет, текст какой-то тут должен быть совершенно случайно',
      date: '12:00',
      count: '3',
    }),
    mock_card2: new ChatCard({
      name: 'Игорь',
      text: 'Привет, текст какой-то тут должен быть совершенно случайно',
      date: '9:00',
      count: '10',
    }),
    mock_card3: new ChatCard({
      name: 'Рик',
      you: 'Вы: ',
      text: 'Привет, текст какой-то тут должен быть совершенно случайно',
      date: 'пт',
    }),
    mock_card4: new ChatCard({
      name: 'Морти',
      text: 'Привет, текст какой-то тут должен быть совершенно случайно',
      date: '20.03.2023',
      count: '1',
    }),
    mock_card5: new ChatCard({
      name: 'Антон',
      text: 'Привет, текст какой-то тут должен быть совершенно случайно',
      date: '19.03.2023',
      count: '1',
    }),
    mock_card6: new ChatCard({
      name: 'Ирина',
      text: 'Привет, текст какой-то тут должен быть совершенно случайно',
      date: '18.03.2023'
    }),
    mock_card7: new ChatCard({
      name: 'Василий Витальевич',
      text: 'Привет, текст какой-то тут должен быть совершенно случайно',
      date: '17.03.2023',
      count: '2',
    }),
    mock_card8: new ChatCard({
      name: 'Анатолий',
      text: 'Привет, текст какой-то тут должен быть совершенно случайно',
      date: '15.03.2023'
    }),
  }
  return data;
}
