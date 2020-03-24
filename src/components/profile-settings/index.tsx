import * as React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { ImagePickerComponent } from '../image-picker';
import { useDispatch } from 'react-redux';
import { fetchUsersImageList } from '../../services/user.service';
import { handleAxiosError } from '../../stores/axios/actions';
import { IUser } from '../../stores/auth/types';
import { addToastAction } from '../../stores/toast/actions';

interface IProps {
  defaultUser?: IUser;
  isLoginFieldVisible: boolean;
  isPasswordRequired: boolean;
  submitButtonText: string;
  onSubmit: (user: IUser) => Promise<void>;
}

export const ProfileSettingsComponent: React.FC<IProps> = (props) => {
  const [login, setLogin] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>();
  const [name, setName] = React.useState<string>();
  const [surname, setSurname] = React.useState<string>();
  const [image, setImage] = React.useState<string>();
  const [imageUrlList, setImageUrlList] = React.useState<string[]>([]);
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const { defaultUser } = props;

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const images = await fetchUsersImageList();
        setImageUrlList(images);
        if (images.length) {
          setImage(images[0]);
        }
        if (defaultUser) {
          setName(defaultUser.name as string);
          setSurname(defaultUser.surname as string);
          setImage(defaultUser.imageUrl as string);
        }
      } catch (err) {
        dispatch(handleAxiosError(err, 'Не удалось получить список изображений профиля'));
      }
    })();
  }, [dispatch, defaultUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(addToastAction({
        message: 'Подтверждение пароля не совпадает с паролем',
        type: 'warning',
        title: 'Указаны некорректные данные',
      }));
      return;
    }
    setSubmitting(true);
    await props.onSubmit({
      id: props.defaultUser ? props.defaultUser.id : 0,
      login,
      password,
      name,
      surname,
      imageUrl: image as string,
    });
    setSubmitting(false);
  };

  return (
    <Form className="flex-grow-1" onSubmit={handleSubmit}>
      <ImagePickerComponent
        initialImageUrl={defaultUser ? defaultUser.imageUrl : undefined}
        imageUrlList={imageUrlList}
        onImageChange={(imageUrl): void => setImage(imageUrl)}
      />
      {props.isLoginFieldVisible ?
        <InputGroup className="mb-3">
          <FormControl
            required
            placeholder="Логин"
            onChange={(e: React.FormEvent<HTMLInputElement>): void => setLogin(e.currentTarget.value)}
          />
        </InputGroup> :
        undefined
      }
      <InputGroup className="mb-3">
        <FormControl
          required={props.isPasswordRequired}
          placeholder="Пароль"
          type="password"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => setPassword(e.currentTarget.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          required={password ? true : props.isPasswordRequired}
          placeholder="Подтверждение пароля"
          type="password"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => setPasswordConfirm(e.currentTarget.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          required
          placeholder="Имя"
          value={name || ''}
          onChange={(e: React.FormEvent<HTMLInputElement>): void => setName(e.currentTarget.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          required
          placeholder="Фамилия"
          value={surname || ''}
          onChange={(e: React.FormEvent<HTMLInputElement>): void => setSurname(e.currentTarget.value)}
        />
      </InputGroup>
      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Обработка...' : props.submitButtonText}
      </Button>
    </Form>
  );
};
