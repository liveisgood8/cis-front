import './styles.css';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';
import { IApplicationState } from '../../stores/config-reducers';
import { IBusinessRequest } from '../../stores/business-requests/types';
import { fetchRequests } from '../../stores/business-requests/actions';
import { Accordion, Card, Button } from 'react-bootstrap';

interface IReduxProps {
  request: IBusinessRequest[];
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  request: state.businessRequests.requests,
});

const mapDispatch = {
  fetchRequests,
  push,
};

const connector = connect(mapStateToProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const RequestListComponent: React.SFC<PropsFromRedux> = (props) => {
  React.useEffect(() => {
    props.fetchRequests();
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      {props.request.map((e, i) => (
        <Card key={i} >
          <Accordion.Toggle as={Card.Header} className="request-header" variant="link" eventKey={i.toString()}>
            {e.title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i.toString()}>
            <Card.Body className="d-flex flex-column">
              <h5>Текст обращения</h5>
              <p>{e.message}</p>
              <Button
                variant="primary"
                className="align-self-end"
                onClick={() => props.push(`/handleRequest/${e.id}`)}>Обработать</Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default connector(RequestListComponent);
