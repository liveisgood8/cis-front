import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IBusinessRequest } from '../../stores/business-requests/types';
import { getById, handleBusinessRequest } from '../../services/business-requests.service';
import { useDispatch } from 'react-redux';
import { handleAxiosError } from '../../stores/axios/actions';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { fetchPendingNumber } from '../../stores/business-requests/actions';

interface IMatchParams {
  id: string;
}

export const HandleRequestComponent: React.FC<RouteComponentProps<IMatchParams>> = (props) => {
  const [request, setRequest] = React.useState<IBusinessRequest>();
  const [email, setEmail] = React.useState<string>();
  const [answer, setAnswer] = React.useState<string>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const requests = await getById(+props.match.params.id);
        setRequest(requests);
        setEmail(request?.contract?.client?.email);
      } catch (err) {
        dispatch(handleAxiosError(err));
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await handleBusinessRequest(request?.id as number, email as string, answer as string);
      dispatch(fetchPendingNumber());
    } catch (err) {
      dispatch(handleAxiosError(err));
    }
  };

  const onAnswerContentChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    e.currentTarget.style.height = '1px';
    e.currentTarget.style.height = (25 + e.currentTarget.scrollHeight) + 'px';
    setAnswer(e.currentTarget.value);
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

      <Form.Group controlId="formAnswer">
        <Form.Label>Ответное сообщение</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Введите ответ клиенту"
          onChange={onAnswerContentChange}
          required
        />
      </Form.Group>

      <Button variant="primary"type="submit">
        Отправить ответ
      </Button>
    </Form>
  );
};
