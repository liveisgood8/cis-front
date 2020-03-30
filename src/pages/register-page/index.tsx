import * as React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { registerAsync } from '../../stores/auth/actions';
import { IApplicationState } from '../../stores/config-reducers';
import { ProfileSettingsComponent } from '../../components/profile-settings';
import { IUser } from '../../stores/auth/types';

interface IStateProps {
  isRegistering: boolean;
}

const mapState = (state: IApplicationState): IStateProps => ({
  isRegistering: state.auth.isRegistering,
});

const mapDispatch = {
  registerAsync,
};

const connector = connect(
  mapState,
  mapDispatch,
);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export const RegisterPage: React.FC<PropsFromRedux> = (props) => {
  const onRegister = async (user: IUser): Promise<void> => {
    props.registerAsync(
      user.login as string,
      user.password as string,
      user.name as string,
      user.surname as string,
      user.imageUrl,
    );
  };

  return (
    <Container className="d-flex min-vh-100 flex-column">
      <Row className="flex-grow-1 flex-column justify-content-center">
        <Col xs={{ offset: 1, span: 10 }} md={{ offset: 4, span: 4 }}
          className="d-flex flex-column p-4 border rounded shadow-sm bg-white mb-4">
          <p className="mb-3 mt-2 align-self-center font-weight-bold">Регистрация в системе</p>
          <ProfileSettingsComponent
            isLoginFieldVisible
            isPasswordRequired
            submitButtonText="Регистрация"
            onSubmit={onRegister}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default connector(RegisterPage);
