import React from 'react';
import { Container } from 'react-bootstrap/lib/Tab';
import { InputGroup, FormControl, Row, Button } from 'react-bootstrap';

export class Login extends React.Component {
  constructor() {
    super({});
  }

  render(): JSX.Element {
    return (
      <Container>
        <Row>
          <InputGroup>
            <FormControl
              placeholder="Логин"
            />
          </InputGroup>
          <InputGroup>
            <FormControl
              placeholder="Пароль"
            />
          </InputGroup>
          <Button
            title="Вход"
          />
        </Row>
      </Container>
    );
  }
}
