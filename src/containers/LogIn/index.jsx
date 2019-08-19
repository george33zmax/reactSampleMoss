import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import LogInForm from './components/LogInForm';
import logo from '../../shared/img/logo/sunrise.png';
import {useAuth0} from "../../react-auth0-wrapper";


const LogIn = () => {
  const {loading, isAuthenticated} = useAuth0();

  console.log("loading", loading);
  console.log("isAuthenticated", isAuthenticated);

  if (loading){
    return (
        <div>{""}</div>
    )
  }

  if(isAuthenticated){
    return(<Redirect to={"projects/pages/one"}/>)
  }

  else {
    return(
        <div className="account">
          <div className="account__wrapper">
            <div className="account__card">
              <div className="account__head">
                <img src={logo} alt=""/>
                <h3 className="account__title">Harness The Power Of The
                  <span className="account__logo"> Sun
            </span>
                </h3>
                <h3 className="account__subhead subhead">Powered by Moss</h3>
              </div>
              <LogInForm onSubmit />
            </div>
          </div>
        </div>
    )
  }
};

export default LogIn;
