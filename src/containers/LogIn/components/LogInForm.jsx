import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useAuth0} from "../../../react-auth0-wrapper";

const LogInForm = () =>  {
    const {loginWithRedirect} = useAuth0();

      return (
          <form className="form" onSubmit={""}>
            <Link onClick={()=>loginWithRedirect({})} className="btn btn-primary account__btn account__btn--small" to="/pages/one">Sign In</Link>
          </form>
      );
};

export default LogInForm;