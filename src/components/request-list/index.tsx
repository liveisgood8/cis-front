import './styles.css';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';
import { IApplicationState } from '../../stores/config-reducers';
import { IBusinessRequest } from '../../stores/business-requests/types';
import { fetchRequests } from '../../stores/business-requests/actions';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';

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
  const { fetchRequests } = props;

  React.useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  if (props.request.length) {
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
  } else {
    return (
      <div className="d-flex flex-column" style={{ color: '#7386D5' }}>
        <div className="align-self-center m-5">
          <FontAwesomeIcon style={{ height: '100px', width: '100%' }} icon={faCommentSlash} />
          <h4>Список обращений пуст</h4>
        </div>
      </div>
    );
  }
};

export default connector(RequestListComponent);
