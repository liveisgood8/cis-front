import './styles.css';

import React from 'react';
import { Card } from 'react-bootstrap';

interface IKeyValueCardProps {
  title: string;
  values: { [name: string]: string | '---' };
}

export const KeyValueCard: React.SFC<IKeyValueCardProps> = ({ title, values }) => {
  const getBodyElements = (): (JSX.Element | undefined)[] => {
    const keys = Object.keys(values);
    const elements: JSX.Element[] = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = values[key];
      if (value === '---') {
        continue;
      }

      elements.push((
        <div key={i} className={(i + 1) < keys.length && values[keys[i + 1]] === '---' ? 'bottom-splitter' : 'pt-10px'}>
          <strong className="mr-2">{key}:</strong>
          <span>{values[key]}</span>
        </div>
      ));
    }
    return elements;
  };

  return (
    <Card className="mb-3">
      <Card.Header>
        <h4>{title}</h4>
      </Card.Header>
      <Card.Body>
        {getBodyElements()}
      </Card.Body>
    </Card>
  );
};
