import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import OtherPage from './OtherPage';
import Fib from './Fib';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Link to="/">Home</Link>
          <Link to="/otherpage">OtherPage</Link>
          <div>
            <Route exact path="/" component={Fib} />
            <Route exact path="/otherpage" component={OtherPage} />
          </div>          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
