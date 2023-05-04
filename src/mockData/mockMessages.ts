import {IProp} from "../utils/Component";
import Message from "../components/Message";

export default function mockMessages(): IProp
{
  const data: IProp = {
    mock_message1: new Message({
      type: 'target',
      text: 'привет, как дела?',
      date: '16:04'
    }),
    mock_message2: new Message({
      type: 'self',
      text: 'привет, как дела?',
      date: '16:05'
    }),
    mock_message3: new Message({
      type: 'self',
      text: 'привет, как дела?',
      date: '16:06'
    }),
    mock_message4: new Message({
      type: 'self',
      text: 'привет, как дела?',
      date: '16:07'
    }),
  }
  return data;
}
