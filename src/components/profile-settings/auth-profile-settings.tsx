import * as React from 'react';
import { toast } from 'react-toastify';
import { ProfileSettingsComponent } from '.';
import { getAuthenticateData } from '../../services/auth.service';
import { updateUser } from '../../services/user.service';

export const AuthProfileSettingsComponent: React.FC<{}> = () => {
  return (
    <ProfileSettingsComponent
      isLoginFieldVisible={false}
      isPasswordRequired={false}
      submitButtonText="Сохранить"
      defaultUser={getAuthenticateData()?.user}
      onSubmit={async (user): Promise<void> => {
        updateUser(user);
        toast.success('Настройка профиля успешно обновлены', {
          autoClose: 2500,
        });
      }}
    />
  );
};
