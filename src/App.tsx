import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Home from './components/home/Home';
import AboutUs from './components/about-us/AboutUs';
import Header from './components/header/Header';
import HeaderText from './components/headerText/headerText';
import Footer from './components/footer/Footer';
import CategoryButton from './components/categoryButton/CategoryButton';
import  auth  from './firebase';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <HeaderText />
      
      <Router>
        <main>
          <Switch>
            <Route path="/home">
              <Home />           
            </Route>
            <Route path="/admin">
              <Admin />           
            </Route>
            <Route path="/about-us">
              <AboutUs />           
            </Route>
            <Route exact path="/">
              <Home />         
            </Route>
          </Switch>
        </main>
      <Footer /> 
      </Router>
    </div>
  );
  
}

export default App;
