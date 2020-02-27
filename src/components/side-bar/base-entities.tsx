import * as React from 'react';

interface IState {
  mounted: boolean;
}

export class BaseEntitiesList<P> extends React.Component<P, IState > {
  constructor(props: P) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        mounted: true,
      });
    }, 0);
  }
}
