import React from 'react';
import { Provider } from 'react-redux';
import { ProfileSettingsComponent } from '.';
import { mockStore } from '../../__mocks__/store';
import { IApplicationState } from '../../stores/config-reducers';
import { mount } from 'enzyme';
import { Form, Button } from 'react-bootstrap';
import { ImagePickerComponent } from '../image-picker';
import * as us from '../../services/user.service';
import { act } from '@testing-library/react';
import { IUser } from '../../stores/auth/types';
import { changeEventMock } from '../../__mocks__/form-utils';
import { toast } from 'react-toastify';
import { userMock } from '../../__mocks__/entitites';

type Props = Omit<React.ComponentProps<typeof ProfileSettingsComponent>,
  'children'>;

describe('profile settings unit', () => {
  const store = mockStore<IApplicationState>({});
  const imageUrlList = [
    'http://image1',
    'http://image2',
    userMock.imageUrl,
  ];

  const setup = async (props: Props) => {
    jest.spyOn(us, 'fetchUsersImageList')
      .mockReturnValue(Promise.resolve(imageUrlList));

    const wrapper = mount(
      <Provider store={store}>
        <ProfileSettingsComponent
          {...props}
        />
      </Provider>,
    );

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    const formControls = wrapper.find(Form.Control);
    return {
      wrapper,
      form: {
        instance: wrapper.find(Form),
        image: wrapper.find(ImagePickerComponent),
        login: props.isLoginFieldVisible ? formControls.at(0) : undefined,
        password: formControls.at(props.isLoginFieldVisible ? 1 : 0),
        passwordConfirm: formControls.at(props.isLoginFieldVisible ? 2 : 1),
        name: formControls.at(props.isLoginFieldVisible ? 3 : 2),
        surname: formControls.at(props.isLoginFieldVisible ? 4 : 3),
        submitButton: wrapper.find(Button),
      },
    };
  };

  beforeEach(() => {
    store.clearActions();
  });

  it('raw render with visible login and password required', async () => {
    const { form } = await setup({
      isLoginFieldVisible: true,
      isPasswordRequired: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit: async (): Promise<void> => { },
      submitButtonText: 'Принять',
    });

    expect(form.image.prop('imageUrlList')).toEqual(imageUrlList);

    expect(form.login?.prop('placeholder')).toEqual('Логин');
    expect(form.login?.prop('required')).toBeTruthy();

    expect(form.password.prop('placeholder')).toEqual('Пароль');
    expect(form.password.prop('required')).toBeTruthy();

    expect(form.passwordConfirm.prop('placeholder')).toEqual('Подтверждение пароля');
    expect(form.passwordConfirm.prop('required')).toBeTruthy();

    expect(form.name.prop('placeholder')).toEqual('Имя');
    expect(form.name.prop('required')).toBeTruthy();

    expect(form.surname.prop('placeholder')).toEqual('Фамилия');
    expect(form.surname.prop('required')).toBeTruthy();

    expect(form.submitButton.text()).toEqual('Принять');
    expect(form.submitButton.prop('type')).toEqual('submit');
    expect(form.submitButton.prop('disabled')).toBeFalsy();
  });

  it('render without login field', async () => {
    const { wrapper, form } = await setup({
      isLoginFieldVisible: false,
      isPasswordRequired: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit: async (): Promise<void> => { },
      submitButtonText: 'Принять',
    });

    expect(wrapper.find(Form.Control).length).toBe(4);
    expect(form.password.prop('placeholder')).toEqual('Пароль');
    expect(form.password.prop('required')).toBeTruthy();
  });

  it('render with not required password', async () => {
    const { form } = await setup({
      isLoginFieldVisible: false,
      isPasswordRequired: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit: async (): Promise<void> => { },
      submitButtonText: 'Принять',
    });

    expect(form.password.prop('required')).toBeFalsy();
    expect(form.passwordConfirm.prop('required')).toBeFalsy();
  });

  it('with default user', async () => {
    const { form } = await setup({
      isLoginFieldVisible: false,
      isPasswordRequired: true,
      defaultUser: userMock,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit: async (): Promise<void> => { },
      submitButtonText: 'Принять',
    });

    expect(form.image.prop('initialImageUrl')).toEqual(userMock.imageUrl);
    expect(form.name.prop('value')).toEqual(userMock.name);
    expect(form.surname.prop('value')).toEqual(userMock.surname);

  });

  it('on submit (diff password)', async () => {
    const warnSpy = jest.spyOn(toast, 'warn');
    const { form } = await setup({
      isLoginFieldVisible: true,
      isPasswordRequired: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit: async (): Promise<void> => { },
      submitButtonText: 'Принять',
    });

    act(() => {
      form.password.props().onChange(changeEventMock('diff_pass1'));
    });
    form.instance.simulate('submit');
    await new Promise((resolve) => setImmediate(resolve));

    expect(warnSpy).toHaveBeenCalled();
    expect(warnSpy.mock.calls[0][0])
      .toEqual('Подтверждение пароля не совпадает с паролем');
  });

  it('on submit', async () => {
    const submitMock = jest.fn().mockReturnValue(Promise.resolve());
    const { wrapper, form } = await setup({
      isLoginFieldVisible: true,
      isPasswordRequired: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit: submitMock,
      submitButtonText: 'Принять',
    });

    act(() => {
      form.login?.props().onChange(changeEventMock(userMock.login));
      form.password.props().onChange(changeEventMock(userMock.password));
      form.passwordConfirm.props().onChange(changeEventMock(userMock.password));
      form.name.props().onChange(changeEventMock(userMock.name));
      form.surname.props().onChange(changeEventMock(userMock.surname));
    });

    form.instance.simulate('submit');
    await act(async () => {
      expect(wrapper.find(Button).text()).toEqual('Обработка...');
      expect(wrapper.find(Button).prop('disabled')).toBeTruthy();

      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();

      expect(wrapper.find(Button).text()).toEqual('Принять');
      expect(wrapper.find(Button).prop('disabled')).toBeFalsy();
    });

    expect(submitMock).toHaveBeenCalled();
    expect(submitMock.mock.calls[0][0]).toEqual({
      ...userMock,
      id: 0,
      imageUrl: imageUrlList[0],
    });
  });
});
