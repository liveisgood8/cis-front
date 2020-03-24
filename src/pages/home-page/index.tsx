import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPeace } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function HomePage(): JSX.Element {
  return (
    <div className="d-flex flex-column flex-grow-1 align-content-center">
      <div className="d-flex flex-column align-items-center justify-content-center mt-auto">
        <div style={{ fontSize: '2em' }}>
          <FontAwesomeIcon className="mr-2" color="#7386D5" icon={faHandPeace} />
          <span>Добро пожаловать!</span>
        </div>
        <p>QCRM поможет вам взаимодействовать с вашими клиентами.</p>
        <Link to={(location) => ({
          ...location,
          pathname: '/addClient',
        })}>
          <Button className="mt-5">Добавить клиента</Button>
        </Link>
      </div>
      <footer className="mt-auto align-self text-center">
        <p style={{ fontSize: '14px', color: 'gray' }}>Powered by Nexus</p>
      </footer>
    </div>
  );
}
