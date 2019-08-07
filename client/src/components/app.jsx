import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar'
    };
  }
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <h2>Hello from React App Component!</h2>
          <h3>If you see this, that means</h3>
          <ul>
            <li>Server is running</li>
            <li>Webpack ran successfully</li>
            <li>CSS and JS are bundled together</li>
          </ul>
          <h3>Happy Hacking!</h3>
        </div>
      </div>
    );
  }
}
