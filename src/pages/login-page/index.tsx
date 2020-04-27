import React from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { loginAsync } from '../../stores/auth/actions';
import { IApplicationState } from '../../stores/config-reducers';
import { Link } from 'react-router-dom';

interface IStateProps {
  loggingIn: boolean;
}

interface ILoginPageState {
  login: string;
  password: string;
}

const mapState = (state: IApplicationState): IStateProps => ({
  loggingIn: state.auth.loggingIn,
});


const mapDispatch = {
  loginAsync,
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

  private onLogin(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.props.loginAsync(this.state.login, this.state.password);
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
            <Form onSubmit={this.onLogin.bind(this)}>
              <p className="mb-3 mt-2 align-self-center font-weight-bold text-center">Вход в систему</p>
              <InputGroup className="mb-3">
                <FormControl
                  required
                  placeholder="Логин"
                  onChange={this.handleLoginChange.bind(this)}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <FormControl
                  required
                  type="password"
                  placeholder="Пароль"
                  onChange={this.handlePasswordChange.bind(this)}
                />
              </InputGroup>
              <Button
                id="login-button"
                type="submit"
                disabled={this.props.loggingIn}
              >
                {this.props.loggingIn ? 'Вход...' : 'Вход'}
              </Button>
            </Form>
          </Col>
          <Col xs={{ offset: 1, span: 10 }} md={{ offset: 4, span: 4 }}
            className="d-flex justify-content-center p-2 border rounded shadow-sm bg-white">
            <p className="m-0">
              Нет аккаунта?&nbsp;
              <Link id="register-link" to={'/registration'}>Зарегистрироваться</Link>
              .
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connector(LoginPage);
