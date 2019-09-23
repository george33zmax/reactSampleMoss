import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import Legend from './LegendComponent';
import DateTimePicker from 'react-datetime-picker';

class Topbar extends PureComponent {
  state = {
    date: new Date()
  };

  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  onChange = date => this.setState({ date });


  render() {
    const { date } = this.state;
    const { changeMobileSidebarVisibility, changeSidebarVisibility, logout } = this.props;

    // console.log("Date: ", date);

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <Link className="topbar__logo" to="/projects" />
          </div>
          <div className="topbar__right">
            <DateTimePicker value={date} onChange={this.onChange}/>
            <Legend />
            <TopbarProfile logout={logout} />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
