import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {getUserInfo} from '../../../redux/actions/userActions';
import renderCheckBoxField from '../../../shared/components/form/CheckBox';

class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  state = {
    showPassword: false,
    username: null,
    password: null,
    loginError: false,
    noUserRecords: false
  };

  componentDidMount() {
    const {socket, dispatch, history} = this.props;

    socket.on("authRes", authRes => {
      console.log("authRes", authRes);
      if (authRes["userExists"]){
        dispatch(getUserInfo({user: authRes["username"]}));
        history.push("/toma");
      }else{
        this.setState({noUserRecords:true})
      }
    });
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  authenticate = (e) => {
    const {socket} = this.props;
    const {username, password} = this.state;
    e.preventDefault();

    const authData = {
      username,
      password
    };
    if(!username || !password){
      this.setState({loginError: true})
    }else {
      socket.emit("Auth", authData);
    }
  };

  render() {
    const { user } = this.props;
    const { showPassword, loginError, noUserRecords } = this.state;

    return (
      <form className="form" onSubmit={""}>
        <div className="form__form-group">
          <span className="form__form-group-label">Username</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
                onChange={(e, newValue)=> this.setState({username: newValue, loginError: false, noUserRecords: false})}
                name="name"
                component="input"
                type="text"
                placeholder="Name"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
                onChange={(e, newValue)=> this.setState({password: newValue, loginError: false, noUserRecords: false})}
                name="password"
                component="input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
            />
            <button
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
              type="button"
            ><EyeIcon />
            </button>
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="remember_me"
              component={renderCheckBoxField}
              label="Remember me"
            />
          </div>
        </div>
        {noUserRecords ? <div><h3 className="form error">Username Does Not Exist</h3></div> : ""}
        {loginError ? <div><h3 className="form error">Username or Password Wrong</h3></div> : ""}
        <Link onClick={(e)=>this.authenticate(e)} className="btn btn-primary account__btn account__btn--small" to="/pages/one">Sign In</Link>
      </form>
    );
  }
}

LogInForm = withRouter(connect(state => ({
  socket: state.socket,
  user: state.user
}))(LogInForm));

export default reduxForm({
  form: 'log_in_form',
})(LogInForm);