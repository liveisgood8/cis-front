import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { ThunkAction } from 'redux-thunk';
import { IApplicationState } from '../../stores/config-reducers';
import { loginAsync } from '../../stores/auth/actions';
import { AuthenticateActions, IUser } from '../../stores/auth/types';
import { connect, ConnectedProps } from 'react-redux';

interface IStateProps {
  loggingIn: boolean;
  user?: IUser;
}

interface IDispatchProps {
  login: typeof loginAsync;
}

const mapState = (state: IApplicationState): IStateProps => ({
  loggingIn: state.auth.loggingIn,
  user: state.auth.user,
});


const mapDispatch: IDispatchProps = {
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

export class Login extends React.Component<PropsFromRedux> {
  public onLogin(): void {
    console.log('login');
    this.props.login('1', '2');
  }

  public render(): JSX.Element {
    return (
      <div>
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
        <Button className="w-25 align-self-end" onClick={this.onLogin.bind(this)}>Вход</Button>
      </div>
    );
  }
}

export default connector(Login);
