import { useRef, useState } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectFieldGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { connect } from "react-redux";

const CreateProfile = () => {
  const handle = useRef(null);
  const company = useRef(null);
  const website = useRef(null);
  const location = useRef(null);
  const status = useRef(null);
  const skills = useRef(null);
  const githubusername = useRef(null);
  const bio = useRef(null);
  const twitter = useRef(null);
  const facebook = useRef(null);
  const linkedin = useRef(null);
  const youtube = useRef(null);
  const instagram = useRef(null);
  const { errors, setErrors } = useState(null);
  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  error: state.errors,
});

export default connect(mapStateToProps, {})(CreateProfile);
