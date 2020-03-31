import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';

export const NotFoundedPage: React.SFC<{text?: string}> = ({ text = 'Страница не найдена!' }) => {
  return (
    <div className="d-flex flex-column flex-grow-1 align-content-center align-items-center justify-content-center">
      <div style={{ fontSize: '2em' }}>
        <FontAwesomeIcon className="mr-2" color="#7386D5" icon={faSadCry} />
      </div>
      <div>
        <span>{text}</span>
      </div>
    </div>
  );
};
