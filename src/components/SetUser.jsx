import React from "react";
import { connect } from "react-redux";
import { setUser } from "../redux/actions";

class SetUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleSetUser = () => {
    this.props.setUser(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="set-user" onClick={this.handleSetUser}>
          Set User
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(SetUser);
// export default SetUser;
