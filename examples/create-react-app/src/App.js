import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

// Export catalog documentation as a dynamic module, so that catalog is not loaded in production

export const catalogAppPage = () => import('catalog')
.then(({markdown, ReactSpecimen}) => markdown`
The \`App\` component displays a rotating logo.

${
  <ReactSpecimen responsive>
    <App />
  </ReactSpecimen>
}
`);
