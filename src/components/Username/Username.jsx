import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Username = ({ username }) => <h2>Hello, {username}!</h2>;

const mapStateToProps = (state) => {
    return { username: state.user.name };
};

Username.propTypes = {
    username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Username);
