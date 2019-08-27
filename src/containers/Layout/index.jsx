import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import {useAuth0} from "../../react-auth0-wrapper";
import { changeThemeToDark, changeThemeToLight } from '../../redux/actions/themeActions';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../redux/actions/sidebarActions';
import {getUserInfo} from '../../redux/actions/userActions';
import { SidebarProps } from '../../shared/prop-types/ReducerProps';

const Layout = (props) => {
  const {user, loading, logout} = useAuth0();

  if (user){
    const { dispatch } = props;
    console.log("user", user);
    dispatch(getUserInfo(user));
  }
  else if (user && !loading){
   return(<Redirect to={"/"}/>)
  }

  const changeSidebarVisibilityF = () => {
    const { dispatch } = props;
    dispatch(changeSidebarVisibility());
  };

  const changeMobileSidebarVisibilityF = () => {
    const { dispatch } = props;
    dispatch(changeMobileSidebarVisibility());
  };

  const changeToDark = () => {
    const { dispatch } = props;
    dispatch(changeThemeToDark());
  };

  const changeToLight = () => {
    const { dispatch } = props;
    dispatch(changeThemeToLight());
  };

    const { sidebar } = props;

    const layoutClass = classNames({
      layout: true,
      'layout--collapse': sidebar.collapse,
    });
    return (
      <div className={layoutClass}>
        <Topbar
            logout={logout}
            changeMobileSidebarVisibility={changeMobileSidebarVisibilityF}
            changeSidebarVisibility={changeSidebarVisibilityF}
        />
        <Sidebar
          sidebar={sidebar}
          changeToDark={changeToDark}
          changeToLight={changeToLight}
          changeMobileSidebarVisibility={changeMobileSidebarVisibility}
        />
      </div>
    );
};

export default withRouter(connect(state => ({
  sidebar: state.sidebar,
  user: state.user,
}))(Layout));
