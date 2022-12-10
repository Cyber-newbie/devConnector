import { useRef } from "react";

const Register = () => {
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const pswInput = useRef(null);
  const pswInput2 = useRef(null);
  const nameHandler = (e) => {
    nameInput.current.value = e.target.value;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: nameInput.current.value,
      email: emailInput.current.value,
      password: pswInput.current.value,
      password2: pswInput2.current.value,
    };

    if (data.password !== data.password2) {
      return console.log("password do not match");
    }
    console.log(data);
    nameInput.current.value = "";
    emailInput.current.value = "";
    pswInput.current.value = "";
    pswInput2.current.value = "";
  };
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form action="create-profile.html" onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  ref={nameInput}
                  onChange={nameHandler}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  ref={emailInput}
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
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  ref={pswInput2}
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

export default Register;
