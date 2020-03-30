import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IBusinessRequest } from '../../stores/business-requests/types';
import { getById, handleBusinessRequest } from '../../services/business-requests.service';
import { useDispatch } from 'react-redux';
import { handleAxiosError } from '../../utils/axios';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { decreasePendingNumber } from '../../stores/business-requests/actions';
import { push } from 'connected-react-router';

interface IMatchParams {
  id: string;
}

export const HandleRequestComponent: React.FC<RouteComponentProps<IMatchParams>> = (props) => {
  const [request, setRequest] = React.useState<IBusinessRequest>();
  const [email, setEmail] = React.useState<string>();
  const [answerBody, setAnswerBody] = React.useState<string>();
  const [answerSubject, setAnswerSubject] = React.useState<string>();
  const [isHandling, setHandling] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const { id } = props.match.params;

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const requests = await getById(+id);
        setRequest(requests);
        setEmail(request?.contract?.client?.email);
      } catch (err) {
        handleAxiosError(err, 'Не удалось получить информации об обращении');
      }
    })();
  }, [dispatch, id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setHandling(true);
    try {
      await handleBusinessRequest(request?.id as number, email as string, {
        subject: answerSubject as string,
        body: answerBody as string,
      });
      dispatch(decreasePendingNumber());
      dispatch(push('/requests'));
    } catch (err) {
      handleAxiosError(err, 'Не удалось утвердить обработку обращения');
    }
    setHandling(false);
  };

  const onAnswerContentChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    e.currentTarget.style.height = '1px';
    e.currentTarget.style.height = (25 + e.currentTarget.scrollHeight) + 'px';
    setAnswerBody(e.currentTarget.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Электронный адрес клиента</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="email"
            placeholder="Введите электронный адрес клиента"
            aria-describedby="inputGroupPrepend"
            required
            // value={request?.contract?.client?.email}
            onChange={(e: React.FormEvent<HTMLInputElement>): void => setEmail(e.currentTarget.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formAnswerSubject">
        <Form.Label>Тема письма</Form.Label>
        <Form.Control
          placeholder="Введите тему письма"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => setAnswerSubject(e.currentTarget.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAnswerBody">
        <Form.Label>Ответное сообщение</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Введите ответ клиенту"
          onChange={onAnswerContentChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isHandling}>
        {isHandling ? 'Обработка обращения...' : 'Отправить ответ'}
      </Button>
    </Form>
  );
};
