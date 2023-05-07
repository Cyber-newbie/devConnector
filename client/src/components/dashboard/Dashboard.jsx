import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { Component, useEffect } from "react";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
const Dashboad = (props) => {
  const { getCurrentProfile } = props;
  useEffect(() => {
    getCurrentProfile();
    console.log("profiling");
  });
  const { user } = props.auth;
  const { profile, loading } = props.profile;
  let dashboardContent;
  if (profile == null || loading) {
    dashboardContent = <Spinner />;
  } else {
    if (Object.keys(profile).length > 0) {
      dashboardContent = <h4>TODO: Display Profile</h4>;
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not setup the profile yet, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboad);
