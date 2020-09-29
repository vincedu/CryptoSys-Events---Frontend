import React from "react";
import { connect } from "react-redux";

const Username = ({ username }) => (
  <h2>Hello, {username}!</h2>
);

const mapStateToProps = state => {
  return { username: state.user.name };
};
export default connect(mapStateToProps)(Username);
