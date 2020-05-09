import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPeace } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { isHasPermissionSelectorFactory } from '../../stores/permissions/selectors';
import { UserPermissions } from '../../stores/permissions/types';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../stores/config-reducers';

export const HomePage: React.FC = () => {
  const isHasAddClientsPermission = useSelector((state: IApplicationState) => isHasPermissionSelectorFactory(
    UserPermissions.ADD_CLIENTS)(state));

  return (
    <div className="d-flex flex-column flex-grow-1 align-content-center">
      <div className="d-flex flex-column align-items-center justify-content-center mt-auto text-center">
        <div style={{ fontSize: '2em' }}>
          <FontAwesomeIcon className="mr-2" color="#7386D5" icon={faHandPeace} />
          <span>Добро пожаловать!</span>
        </div>
        <p>QCRM поможет вам взаимодействовать с вашими клиентами.</p>
        {isHasAddClientsPermission ? (
          <Link to={(location) => ({
            ...location,
            pathname: '/addClient',
          })}>
            <Button id="add-client" className="mt-5">Добавить клиента</Button> :
          </Link>
        ) : (
          <Link to={(location) => ({
            ...location,
            pathname: '/requests',
          })}>
            <Button id="add-client" className="mt-5">Просмотреть обращения</Button> :
          </Link>
        )}
      </div>
      <footer className="mt-auto align-self text-center">
        <p style={{ fontSize: '14px', color: 'gray' }}>Powered by Nexus</p>
      </footer>
    </div>
  );
};
