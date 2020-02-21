import React from 'react';
import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { loginAsync, LoginAsyncThunk } from '../../stores/auth/actions';
import { IApplicationState } from '../../stores/config-reducers';
import { IUser } from '../../stores/auth/types';
import { Link } from 'react-router-dom';

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
  ): LoginAsyncThunk =>
    loginAsync(username, password),
};

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

export class LoginPage extends React.Component<PropsFromRedux> {
  private onLogin(): void {
    this.props.login('1', '2');
  }

  public render(): JSX.Element {
    return (
      <Container className="d-flex min-vh-100 flex-column">
        <Row className="flex-grow-1 flex-column justify-content-center">
          <Col xs={{ offset: 1, span: 10 }} md={{ offset: 4, span: 4 }}
            className="d-flex flex-column p-4 border rounded shadow-sm bg-white mb-4">
            <p className="mb-3 mt-2 align-self-center font-weight-bold">Вход в систему</p>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Логин"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Пароль"
              />
            </InputGroup>
            <Button
              disabled={this.props.loggingIn}
              onClick={this.onLogin.bind(this)}>
              {this.props.loggingIn ? 'Вход...' : 'Вход'}
            </Button>
          </Col>
          <Col xs={{ offset: 1, span: 10 }} md={{ offset: 4, span: 4 }}
            className="d-flex justify-content-center p-2 border rounded shadow-sm bg-white">
            <p className="m-0">
              Нет аккаунта?&nbsp;
              <Link to={'/registration'}>Зарегистрироваться</Link>
              .
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connector(LoginPage);
