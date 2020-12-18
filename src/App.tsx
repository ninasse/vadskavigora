import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Home from './components/home/Home';
import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>Welcome to vadskavigoranu.se!</h1>
   
    <Router>
        <header className="navbar">
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">Home</Link>             
              </li>            
              <li>
                <Link to="/admin">Admin</Link>             
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/home">
              <Home />           
            </Route>
            <Route path="/admin">
              <Admin />           
            </Route>
            <Route exact path="/">
              <Home />           
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
