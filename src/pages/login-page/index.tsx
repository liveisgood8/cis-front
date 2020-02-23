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

interface ILoginPageState {
  login: string;
  password: string;
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

export type PropsFromRedux = ConnectedProps<typeof connector>;

export class LoginPage extends React.Component<PropsFromRedux, ILoginPageState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  private onLogin(): void {
    console.log(this.state);
    this.props.login(this.state.login, this.state.password);
  }

  shouldComponentUpdate(nextProps: PropsFromRedux, nextState: ILoginPageState): boolean {
    if (nextState?.login !== this.state?.login ||
      nextState?.password !== this.state?.password
    ) {
      return false;
    }
    return true;
  }

  handleLoginChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      ...this.state,
      login: e.target.value,
    });
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      ...this.state,
      password: e.target.value,
    });
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
                onChange={this.handleLoginChange.bind(this)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Пароль"
                onChange={this.handlePasswordChange.bind(this)}
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
