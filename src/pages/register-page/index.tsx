import * as React from 'react';
import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { registerAsync } from '../../stores/auth/actions';
import { IApplicationState } from '../../stores/config-reducers';
import { addToastAction } from '../../stores/toast/actions';
import { ImagePickerComponent } from '../../components/image-picker';
import { fetchUsersImageList } from '../../services/user.service';
import { handleAxiosError } from '../../stores/axios/actions';

interface IStateProps {
  isRegistering: boolean;
}

const mapState = (state: IApplicationState): IStateProps => ({
  isRegistering: state.auth.isRegistering,
});

const mapDispatch = {
  registerAsync,
  addToastAction,
};

const connector = connect(
  mapState,
  mapDispatch,
);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export const RegisterPage: React.FC<PropsFromRedux> = (props) => {
  const [login, setLogin] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [image, setImage] = React.useState<string>('');
  const [imageUrlList, setImageUrlList] = React.useState<string[]>([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const images = await fetchUsersImageList();
        setImageUrlList(images);
      } catch (err) {
        dispatch(handleAxiosError(err, 'Не удалось получить список изображений профиля'));
      }
    })();
  }, [dispatch]);

  const onRegister = (): void => {
    if (password !== passwordConfirm) {
      props.addToastAction({
        title: 'Пароль не совпадает с подтверждением',
        message: '',
        type: 'warning',
      });
      return;
    }
    props.registerAsync(
      login,
      password,
      name,
      surname,
      image,
    );
  };

  return (
    <Container className="d-flex min-vh-100 flex-column">
      <Row className="flex-grow-1 flex-column justify-content-center">
        <Col xs={{ offset: 1, span: 10 }} md={{ offset: 4, span: 4 }}
          className="d-flex flex-column p-4 border rounded shadow-sm bg-white mb-4">
          <p className="mb-3 mt-2 align-self-center font-weight-bold">Регистрация в системе</p>
          <ImagePickerComponent
            imageUrlList={imageUrlList}
            onImageChange={(imageUrl): void => setImage(imageUrl)}
          />
          <InputGroup className="mb-3">
            <FormControl
              required
              placeholder="Логин"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => setLogin(e.currentTarget.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              required
              placeholder="Пароль"
              type="password"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => setPassword(e.currentTarget.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              required
              placeholder="Подтверждение пароля"
              type="password"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => setPasswordConfirm(e.currentTarget.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              required
              placeholder="Имя"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => setName(e.currentTarget.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              required
              placeholder="Фамилия"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => setSurname(e.currentTarget.value)}
            />
          </InputGroup>
          <Button
            disabled={props.isRegistering}
            onClick={onRegister}>
            {props.isRegistering ? 'Регистрация...' : 'Регистрация'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default connector(RegisterPage);
