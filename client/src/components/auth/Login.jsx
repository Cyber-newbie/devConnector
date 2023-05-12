// import {Link} from 'react-router-dom'
import { useRef } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import TextFieldGroup from "../common/TextFieldGroup";
let i = 0;
const Login = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated } = props.auth;
  useEffect(() => {
    if (isAuthenticated) {
      console.log("navigating");
      navigate("/dashboard");
    }
    // console.log(isAuthenticated);
    console.log(i++);
    // navigate("/dashboard");
  }, [isAuthenticated]);

  const emailInput = useRef(null);
  const pswInput = useRef(null);
  const [errors, setErrors] = useState({});

  const emailHandler = (e) => {
    console.log("handling");
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

  const memoizedErrors = useMemo(() => errors, [errors]);

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
              <TextFieldGroup
                type="email"
                name="email"
                placeholder="Email"
                ref={emailInput}
                onChange={emailHandler}
                error={memoizedErrors.email}
              />

              <TextFieldGroup
                type="password"
                name="password"
                placeholder="password"
                ref={pswInput}
                onChange={pswdHandler}
                error={memoizedErrors.password}
              />

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
