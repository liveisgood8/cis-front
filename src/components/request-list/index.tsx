import './styles.css';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { IApplicationState } from '../../stores/config-reducers';
import { fetchRequests } from '../../stores/business-requests/actions';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';

export const RequestListComponent: React.SFC = () => {
  const requests = useSelector((state: IApplicationState) => state.businessRequests.requests);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  if (requests.length) {
    return (
      <Accordion defaultActiveKey="0" className="flex-grow-1">
        {requests.map((e, i) => (
          <Card key={i} >
            <Accordion.Toggle as={Card.Header} className="request-header" variant="link" eventKey={i.toString()}>
              {e.title}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={i.toString()}>
              <Card.Body className="d-flex flex-column">
                <h5>Текст обращения</h5>
                <p>{e.message}</p>
                <Button
                  id="show-request-button"
                  variant="primary"
                  className="align-self-end"
                  onClick={() => dispatch(push(`/handleRequest/${e.id}`))}>Обработать</Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    );
  } else {
    return (
      <div className="flex-grow-1 align-self-center d-flex flex-column" style={{ color: '#7386D5' }}>
        <div className="align-self-center m-5">
          <FontAwesomeIcon style={{ height: '100px', width: '100%' }} icon={faCommentSlash} />
          <h4>Список обращений пуст</h4>
        </div>
      </div>
    );
  }
};

export default RequestListComponent;
