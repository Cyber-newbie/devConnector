// import {Link} from 'react-router-dom'
import { useRef } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
const Login = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated } = props.auth;
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    console.log(isAuthenticated);
  });

  const emailInput = useRef(null);
  const pswInput = useRef(null);
  const [errors, setErrors] = useState({});

  const emailHandler = (e) => {
    emailInput.current.value = e.target.value;
  };

  const pswdHandler = (e) => {
    pswInput.current.value = e.target.value;
  };

  const submitHandler = (e) => {
    console.log("submitting");
    e.preventDefault();
    const userData = {
      email: emailInput.current.value,
      password: pswInput.current.value,
    };
    // console.log(userData);
    props.loginUser(userData);
    emailInput.current.value = "";
    pswInput.current.value = "";
    console.log(!isEmpty());
    if (props.error) {
      setErrors({ ...props.error });
    }
  };

  const isPassword = errors.password
    ? "form-control form-control-lg is-invalid"
    : "form-control form-control-lg";
  const isEmail = errors.email
    ? "form-control form-control-lg is-invalid"
    : "form-control form-control-lg";

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign into your DevConnect account
            </p>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  type="email"
                  className={isEmail}
                  placeholder="Email"
                  name="email"
                  ref={emailInput}
                  onChange={emailHandler}
                />
                {errors.email && (
                  <small className="invalid-feedback">{errors.email}</small>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={isPassword}
                  placeholder="password"
                  name="password"
                  ref={pswInput}
                  onChange={pswdHandler}
                />
                {errors.password && (
                  <small className="invalid-feedback">{errors.password}</small>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
