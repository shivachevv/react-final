import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import UserProvider from './UserProvider'
import Home from './Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorPage from './views/ErrorPage/ErrorPage';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={ErrorPage} />
        </Switch>
        <Footer></Footer>
      </Router>
    </UserProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
