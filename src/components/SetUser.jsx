import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions';

class SetUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: '' };
    }

    updateInput = (input) => {
        this.setState({ input });
    };

    handleSetUser = () => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setUser(this.state.input);
        this.setState({ input: '' });
    };

    render() {
        const { input } = this.state;
        return (
            <div>
                <input onChange={(e) => this.updateInput(e.target.value)} value={input} />
                <button type="button" className="set-user" onClick={this.handleSetUser}>
                    Set User
                </button>
            </div>
        );
    }
}

SetUser.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default connect(null, { setUser })(SetUser);
// export default SetUser;
