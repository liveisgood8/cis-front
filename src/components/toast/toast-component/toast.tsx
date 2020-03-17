import './toast.css';
import * as React from 'react';
import { Alert, Fade } from 'react-bootstrap';
import { IToastDefinition } from '../../../stores/toast/types';

interface IProps {
  toast: IToastDefinition;
  onClose: () => void;
}

export const AlertPopup: React.FC<IProps> = (props) => {
  const [isVisible, setVisible] = React.useState<boolean>(false);
  const [fadeTimeout, setFadeTimeout] = React.useState<number>(2000);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFadeTimeout(500);
      setVisible(false);
    }, 5000);

    return (): void => clearTimeout(timer);
  });

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    });
  }, []);

  return (
    <Fade in={isVisible} timeout={fadeTimeout} onExited={(): void => props.onClose()}>
      <div>
        <Alert variant={props.toast.type}>
          <Alert.Heading>{props.toast.title}</Alert.Heading>
          <p>{props.toast.message}</p>
        </Alert>
      </div>
    </Fade>
  );
};
