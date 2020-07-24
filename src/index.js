import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './Home';
import Login from './views/Login/Login';
import Header from './views/Header/Header';
import Footer from './views/Footer/Footer';
import ErrorPage from './views/ErrorPage/ErrorPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route component={ErrorPage}/>
      </Switch>
      <Footer></Footer>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
