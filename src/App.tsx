import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Admin from './components/admin/Admin';
import Home from './components/home/Home';
import AboutUs from './components/about-us/AboutUs';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LogIn from './components/log-in/LogIn';
import PrivateRoute from './components/private-route/PrivateRoute';
import SuggestionComp from './components/suggestionComp/SuggestionComp';
import {AuthProvider} from './contexts/AuthContext';
import './App.scss';
function App() {
 
 
  return (
    <div className="App">
      <Header />
      <Router>
        <main>
        <AuthProvider>
          <Switch>
            <Route path="/home">
              <Home />           
            </Route>
            <PrivateRoute path="/admin" component={Admin} />
            <Route path="/log-in">
              <LogIn />           
            </Route>
            <Route path="/about-us">
              <AboutUs />           
            </Route>
            <Route exact path="/">
              <Home />         
            </Route>
            <Route path="/suggestion">
              <SuggestionComp />         
            </Route>
          </Switch>
          </AuthProvider>
        </main>
      <Footer /> 
      </Router>
    </div>
  );
  
}

export default App;
