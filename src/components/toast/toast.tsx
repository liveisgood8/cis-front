import './toast.css';
import * as React from 'react';
import { Alert, Fade } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { IToastDefinition } from '../../stores/toast/types';
import { IApplicationState } from '../../stores/config-reducers';
import { addToastAction, clearToastAction } from '../../stores/toast/actions';

interface IStateProps {
  toasts: IToastDefinition[];
}

const mapState = (state: IApplicationState): IStateProps => ({
  toasts: state.toasts.toasts,
});

const mapDispatch = {
  addToast: addToastAction,
  clearToasts: clearToastAction,
};

const connector = connect(
  mapState,
  mapDispatch,
);

export type PropsFromRedux = ConnectedProps<typeof connector>

/* eslint-disable react/prop-types */

const AlertPopup: React.SFC<PropsFromRedux> = (props) => {
  React.useEffect(() => {
    if (props.toasts.length) {
      const timer = setTimeout(() => {
        props.clearToasts();
      }, 3000);
      return (): void => clearTimeout(timer);
    }
  });

  return (
    <div className="toast-container toast-container-position">
      {props.toasts.map((e, i) => {
        return (
          <Fade in={true} key={i}>
            <Alert variant={e.type}>
              <Alert.Heading>{e.title}</Alert.Heading>
              <p>{e.message}</p>
            </Alert>
          </Fade>
        );
      })}
    </div>
  );
};

/* eslint-enable react/prop-types */

export default connector(AlertPopup);
