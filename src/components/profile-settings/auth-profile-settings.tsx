import * as React from 'react';
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
      onSubmit={async (user): Promise<void> => updateUser(user)}
    />
  );
};
