import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router
} from 'react-router-dom'
import UserProvider from './UserProvider'
import Header from './components/Header/Header';
import TeamsRibbon from './components/TeamsRibbon/TeamsRibbon';
import Footer from './components/Footer/Footer';
import Routes from './Routes'
import { auth } from './firebase'

auth.onAuthStateChanged(user => {

  ReactDOM.render(
    <React.StrictMode>
      <UserProvider>
        <Router>
          <Header></Header>
          <TeamsRibbon></TeamsRibbon>
          <Routes user={user} />
          <Footer></Footer>
        </Router>
      </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );

});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
