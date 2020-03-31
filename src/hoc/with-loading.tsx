import React, { ComponentType } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface IWithLoadingProps {
  isLoading: boolean;
}

export function withLoading<T>(Component: ComponentType<T>): ComponentType<T & IWithLoadingProps> {
  return ({ isLoading, ...props }: IWithLoadingProps): JSX.Element => {
    if (isLoading) {
      return (
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <FontAwesomeIcon
            style={{ height: '48px', width: '48px' }}
            icon={faSpinner}
            spin
          />
        </div>
      );
    } else {
      return <Component {...props as T}/>;
    }
  };
};
