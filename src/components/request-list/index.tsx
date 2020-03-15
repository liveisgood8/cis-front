import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IApplicationState } from '../../stores/config-reducers';
import { IBusinessRequest } from '../../stores/business-requests/types';
import { fetchRequests } from '../../stores/business-requests/actions';

interface IReduxProps {
  request: IBusinessRequest[];
}

const mapStateToProps = (state: IApplicationState): IReduxProps => ({
  request: state.businessRequests.requests,
});


const mapDispatch = {
  fetchRequests,
};

const connector = connect(mapStateToProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export class RequestListComponent extends React.Component<PropsFromRedux> {
  componentDidMount(): void {
    this.props.fetchRequests();
  }

  render(): JSX.Element {
    return (
      <div>
        {this.props.request.map((e, i) => (
          <p key={i}>{e.message}</p>
        ))}
      </div>
    );
  }
}

export default connector(RequestListComponent);
