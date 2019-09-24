import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="loginWrap">
        <form
          onSubmit={e =>
            this.props.validateUser(e, this.state.username, this.state.password)
          }
        >
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            onChange={e => this.handleUsernameChange(e)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={e => this.handlePasswordChange(e)}
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
