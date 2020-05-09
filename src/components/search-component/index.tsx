import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface ISearchComponentProps {
  onSearch: (query: string) => void;
};

export const SearchComponent: React.FC<ISearchComponentProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="d-flex m-2">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          id="search-input"
          type="text"
          placeholder="Поиск"
          required
          onChange={(event: FormEvent<HTMLInputElement>): void => setQuery(event.currentTarget.value)}
          onKeyUp={(event: KeyboardEvent<HTMLInputElement>): void => {
            if (event.keyCode === 13) {
              // Enter pressed
              if (query) {
                onSearch(query);
              }
            }
          }}
        />
      </InputGroup>
    </div>
  );
};
