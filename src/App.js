import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Sample01 from './components/Sample01';
import Flexbox from './components/Flexbox'

class App extends Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();

  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>BB-Wallet-Web</h2>
          </div>
          <div className="App-body">
            <Sample01 />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
