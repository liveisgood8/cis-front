import React from 'react';
import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { loginAsync } from '../../stores/auth/actions';
import { ThunkAction } from 'redux-thunk';
import { IApplicationState } from '../../stores/config-reducers';
import { AuthenticateActions, IUser } from '../../stores/auth/types';

interface IStateProps {
  loggingIn: boolean;
  user?: IUser;
}

const mapState = (state: IApplicationState): IStateProps => ({
  loggingIn: state.auth.loggingIn,
  user: state.auth.user,
});


const mapDispatch = {
  login: (
    username: string,
    password: string,
  ): ThunkAction<Promise<void>, IApplicationState, unknown, AuthenticateActions> =>
    loginAsync(username, password),
};

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

export class LoginPath extends React.Component<PropsFromRedux> {
  private onLogin(): void {
    console.log('login');
    this.props.login('1', '2');
  }

  public render(): JSX.Element {
    return (
      <Container className="d-flex min-vh-100">
        <Row className="flex-grow-1 align-items-center">
          <Col xs={{ offset: 1, span: 10 }} md={{ offset: 4, span: 4 }}
            className="d-flex flex-column p-2 border rounded shadow-sm">
            <span className="mb-3 align-self-center">Вход в систему</span>
            <InputGroup className="mb-2">
              <FormControl
                placeholder="Логин"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                placeholder="Пароль"
              />
            </InputGroup>
            <Button
              className="w-25 align-self-end"
              disabled={this.props.loggingIn}
              onClick={this.onLogin.bind(this)}>
              {this.props.loggingIn ? 'Вход...' : 'Вход'}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connector(LoginPath);
