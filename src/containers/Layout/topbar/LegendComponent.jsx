import React, { PureComponent } from 'react';
import Legend from './Legend';

export default class LegendComponent extends PureComponent {

  state = {

  };

  render() {
    const {} = this.state;


    return (
      <form className="topbar__search">
          <Legend />
      </form>
    );
  }
}
