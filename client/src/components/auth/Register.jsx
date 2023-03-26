import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
// import axios from 'axios'

const Register = (props) => {
  const navigate = useNavigate();
  const isSuccess = localStorage.getItem("success");
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    localStorage.clear();
    console.log("running");
  }, [isSuccess, navigate]);

  const [errors, setErrors] = useState({});
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const pswInput = useRef(null);
  const pswInput2 = useRef(null);
  const nameHandler = (e) => {
    nameInput.current.value = e.target.value;
  };

  const emailHandler = (e) => {
    emailInput.current.value = e.target.value;
  };

  const pswdHandler = (e) => {
    pswInput.current.value = e.target.value;
  };

  const pswd2Handler = (e) => {
    pswInput2.current.value = e.target.value;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: nameInput.current.value,
      email: emailInput.current.value,
      password: pswInput.current.value,
    };

    if (data.password !== pswInput2.current.value) {
      return console.log("password do not match");
    }

    props.registerUser(data);
    localStorage.setItem("success", true);
    // const user = await fetch("http://localhost:5000/api/users/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   body: JSON.stringify(data),
    //   // mode: "no-cors",
    // });
    // const created = await user.json();
    if (props.error) {
      setErrors({ ...props.error });
    }
    console.log(props.error);
    nameInput.current.value = "";
    emailInput.current.value = "";
    pswInput.current.value = "";
    pswInput2.current.value = "";
  };
  const isName = errors.name
    ? "form-control form-control-lg is-invalid"
    : "form-control form-control-lg";
  const isEmail = errors.email
    ? "form-control form-control-lg is-invalid"
    : "form-control form-control-lg";

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className={isName}
                  placeholder="Name"
                  name="name"
                  ref={nameInput}
                  onChange={nameHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={isEmail}
                  placeholder="Email Address"
                  name="email"
                  ref={emailInput}
                  onChange={emailHandler}
                />
                <small className="form-text text-muted">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  ref={pswInput}
                  onChange={pswdHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  ref={pswInput2}
                  onChange={pswd2Handler}
                />
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
export default connect(mapStateToProps, { registerUser })(Register);
