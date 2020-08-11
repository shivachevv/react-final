import React, { Component } from 'react';
import Spinner from 'react-spinner-material';
import styles from './loading.module.scss'

export default class Loading extends Component {
  render() {
  return (
      <div className={styles.loading}>
        <Spinner radius={50} color={"#924A42"} stroke={4} visible={true} />
      </div>
    );
  }
}