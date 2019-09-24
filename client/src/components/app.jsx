import React from 'react';
import Login from './login';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      message: 'Please log in to begin',
      user: {}
    };
    this.validateUser = this.validateUser.bind(this);
  }

  async validateUser(e, name, password) {
    e.preventDefault();
    const results = await axios.get(
      `http://localhost:3000/api/users?name=${name}`
    );
    if (results.data.length && results.data[0].password === password) {
      this.setState({
        message: `Welcome back ${results.data[0].username}`,
        user: results[0],
        loggedIn: true
      });
    } else if (results.data.length && results.data[0].password !== password) {
      this.setState({
        message: 'Sorry, you entered the wrong password. Please try again.'
      });
    } else {
      console.log('trying to create new user');
      const newUser = await axios.post(`http://localhost:3000/api/users`, {
        name,
        password
      });
      this.setState({
        user: newUser,
        message: `Welcome to HackerBank, ${newUser.data[0].username}`,
        loggedIn: true
      });
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <>
          <h2>{this.state.message}</h2>
          <Login validateUser={this.validateUser} />
        </>
      );
    }
    return (
      <div className="wrapper">
        <div className="main">
          <h2>{this.state.message}</h2>
        </div>
      </div>
    );
  }
}
