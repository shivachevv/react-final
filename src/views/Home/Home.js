import React, { Component } from 'react';
import styles from './home.module.scss'
import {auth} from '../../firebase'

class Home extends Component {
  constructor(props) {
    super(props);


  }

componentDidMount(){
  // const user = auth.currentUser
  // console.log(user);
}

  render() {
    return (
      <div>
        HOME PAGE
      </div >
    );
  }
}

export default Home;



