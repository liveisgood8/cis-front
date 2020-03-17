import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IToastDefinition } from '../../stores/toast/types';
import { IApplicationState } from '../../stores/config-reducers';
import { addToastAction, removeToastAction } from '../../stores/toast/actions';
import { AlertPopup } from './toast-component/toast';

interface IStateProps {
  toasts: IToastDefinition[];
}

const mapState = (state: IApplicationState): IStateProps => ({
  toasts: state.toasts.toasts,
});

const mapDispatch = {
  addToast: addToastAction,
  removeToast: removeToastAction,
};

const connector = connect(
  mapState,
  mapDispatch,
);

export type PropsFromRedux = ConnectedProps<typeof connector>

/* eslint-disable react/prop-types */

const ToastContainer: React.FC<PropsFromRedux> = (props) => {
  return (
    <div className="toast-container toast-container-position">
      {props.toasts.map((e, i) => {
        return (
          <AlertPopup key={i} toast={e} onClose={(): void => {
            props.removeToast(e);
          }}/>
        );
      })}
    </div>
  );
};

/* eslint-enable react/prop-types */

export default connector(ToastContainer);
