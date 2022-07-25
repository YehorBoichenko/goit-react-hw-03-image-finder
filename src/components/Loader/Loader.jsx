import React, { Component } from 'react';
import styles from '../Loader/Loader.module.css';
import { BallTriangle } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class LoaderSpinner extends Component {
  state = {};
  render() {
    return (
      <div className={styles.loader}>
        <BallTriangle
          type="BallTriangle"
          color="#3f51b5"
          height={200}
          width={200}
        />
      </div>
    );
  }
}
