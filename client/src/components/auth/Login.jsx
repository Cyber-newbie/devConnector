// import {Link} from 'react-router-dom'
import { useRef } from "react";
const Login = () => {
  const emailInput = useRef(null);
  const pswInput = useRef(null);

  const emailHandler = (e) => {
    emailInput.current.value = e.target.value;
  };

  const pswdHandler = (e) => {
    pswInput.current.value = e.target.value;
  };


  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email: emailInput.current.value,
      password: pswInput.current.value,
    };
    console.log(data);
    emailInput.current.value = "";
    pswInput.current.value = "";
    
  }
  return (  
<div className="login">
<div className="container">
  <div className="row">
    <div className="col-md-8 m-auto">
      <h1 className="display-4 text-center">Log In</h1>
      <p className="lead text-center">Sign into your DevConnect account</p>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Email"
            name="email"
            ref={emailInput}
            onChange={emailHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="password"
            name="password"
            ref={pswInput}
            onChange={pswdHandler}            
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

export default Login;
