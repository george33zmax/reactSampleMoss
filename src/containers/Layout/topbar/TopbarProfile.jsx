import React, { PureComponent } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import {connect} from "react-redux";

class TopbarProfile extends PureComponent {

  state = {
    collapse: false,
  };

  componentDidMount() {

  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  render() {
    const {collapse} = this.state;
    const {user, logout} = this.props;

    return (
      <div className="topbar__profile">
        <button type="button" className="topbar__avatar" onClick={this.toggle}>
          {user && user["picture"] ? <img className="topbar__avatar-img" src={user["picture"]} alt="avatar" /> : "" }
          <p className="topbar__avatar-name">{user["name"]}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && <button type="button" className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink title="Page one" icon="list" path="/pages/one" />
            <TopbarMenuLink title="Page two" icon="inbox" path="/pages/two" />
            <div className="topbar__menu-divider" />
            <TopbarMenuLink logout={logout} title="Log Out" icon="exit" path="/" />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user
}))(TopbarProfile);